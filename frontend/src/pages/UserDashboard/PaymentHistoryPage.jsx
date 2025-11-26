import React, { useEffect, useState } from 'react';
// Import icon từ lucide-react
import { Receipt, Search, History } from 'lucide-react'; 
import { PaymentService } from '../../api/paymentService';

const PaymentHistoryPage = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const data = await PaymentService.getPaymentHistory();
                const sortedData = Array.isArray(data) 
                    ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                    : [];
                setPayments(sortedData);
                setFilteredPayments(sortedData);
            } catch (error) {
                console.error("Lỗi tải lịch sử thanh toán:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredPayments(payments);
        } else {
            const lowerTerm = searchTerm.toLowerCase();
            const filtered = payments.filter(item => 
                (item.transactionNo && item.transactionNo.toLowerCase().includes(lowerTerm)) ||
                (item.orderId && item.orderId.toLowerCase().includes(lowerTerm)) ||
                (item.paymentMethod && item.paymentMethod.toLowerCase().includes(lowerTerm))
            );
            setFilteredPayments(filtered);
        }
    }, [searchTerm, payments]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        return new Date(timestamp).toLocaleString('vi-VN', {
            hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'
        });
    };

    const isSuccess = (payment) => payment.responseCode === '00' || payment.status === 'SUCCESS';

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 min-h-[500px]">
            {/* --- Header --- */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    {/* Icon History của Lucide */}
                    <History className="text-blue-600 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-gray-800">Lịch sử thanh toán</h2>
                </div>
                <div className="text-sm text-gray-500">
                    Tổng cộng: <span className="font-bold text-gray-800">{payments.length}</span> giao dịch
                </div>
            </div>

            {/* --- Search Bar --- */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* Icon Search của Lucide */}
                    <Search className="text-gray-400 w-5 h-5" />
                </div>
                <input 
                    type="text" 
                    placeholder="Tìm theo mã giao dịch, mã đơn hàng, phương thức..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* --- Content Area --- */}
            {loading ? (
                <div className="text-center py-20 text-gray-500">
                    <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full mb-2" role="status" aria-label="loading"></div>
                    <p>Đang tải dữ liệu...</p>
                </div>
            ) : filteredPayments.length > 0 ? (
                <div className="overflow-x-auto overflow-y-auto max-h-[500px] border border-gray-200 rounded-lg custom-scrollbar">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        {/* 4. Thêm sticky top-0 và z-10 để Header đứng yên khi cuộn */}
                        <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 text-gray-600 uppercase tracking-wider font-semibold shadow-sm">
                            <tr>
                                <th className="px-4 py-3">Mã Giao Dịch</th>
                                <th className="px-4 py-3">Phương Thức</th>
                                <th className="px-4 py-3 text-right">Số Tiền</th>
                                <th className="px-4 py-3">Thời Gian</th>
                                <th className="px-4 py-3 text-center">Trạng Thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {filteredPayments.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-gray-900">{item.transactionNo || '---'}</div>
                                        <div className="text-xs text-gray-500">Order: {item.orderId}</div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {item.paymentMethod} <br/>
                                        <span className="text-xs text-gray-400">{item.bankCode}</span>
                                    </td>
                                    <td className="px-4 py-3 text-right font-bold text-gray-800">
                                        {formatCurrency(item.amount)}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {formatDate(item.createdAt)}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            isSuccess(item) 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                            {isSuccess(item) ? 'Thành công' : 'Thất bại'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-16">
                    <Receipt className="mx-auto text-gray-300 w-16 h-16 mb-4" />
                    <p className="text-gray-500 font-medium">
                        {searchTerm ? 'Không tìm thấy giao dịch nào phù hợp.' : 'Chưa có thông tin thanh toán'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PaymentHistoryPage;