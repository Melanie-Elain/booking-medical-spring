import React, { useEffect, useState } from 'react';
import Header from '../../components/Home/Header';
import HomeFooter from '../../components/Home/HomeFooter';
import { CheckCircle, XCircle } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom'; 
import { appointmentService } from '../../api/appointmentService';

const CompletePayment = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status'); // Lấy status từ URL
    const orderId = searchParams.get('orderId'); // Lấy orderId từ URL

    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Tạo một hàm async riêng bên trong useEffect
        const fetchBookingInfo = async () => {
            if (orderId && status === 'success') {
                try {
                    // 2. Gọi API và đợi kết quả (await)
                    const response = await appointmentService.getAppointmentInforDetails(orderId);
                    console.log("Thông tin lịch hẹn: ", response);
                    const data = response.data || response; 

                    // 4. Map dữ liệu
                    const mappedData = {
                        mainName: data.tenDonVi,
                        mainAddress: data.diaChiDonVi || "Địa chỉ phòng khám",
                        mainImage: data.hinhAnhDonVi || "https://via.placeholder.com/40",
                        
                        code: data.maLichHen,
                        date: data.ngayKham,
                        time: data.gioKham,
                        
                        patient: {
                            name: data.tenBenhNhan,
                            dob: data.ngaySinh,
                            gender: data.gioiTinh,
                            address: data.diaChiBenhNhan,
                            note: data.ghiChu
                        }
                    };

                    setBookingDetails(mappedData);
                    
                } catch (error) {
                    console.error("Lỗi lấy thông tin:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchBookingInfo();

    }, [orderId, status]);
    if (status === 'failed') {
        return (
            <>
                <Header />
                <div className="bg-gray-100 py-12 min-h-screen flex items-center justify-center">
                    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl text-center">
                        <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thanh toán thất bại</h1>
                        <p className="text-gray-600 mb-6">Giao dịch đã bị hủy hoặc xảy ra lỗi.</p>
                        <a href="/" className="block w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                            Quay về trang chủ
                        </a>
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }

    if (loading) {
        return <div className="text-center py-20">Đang tải thông tin vé khám...</div>;
    }

    if (!bookingDetails) {
        return <div className="text-center py-20">Không tìm thấy thông tin lịch hẹn #{orderId}</div>;
    }

    const displayMainTitle = bookingDetails.mainName;

    return (
        <>
            <Header />
            <div className="bg-gray-100 py-12">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
                    
                    {/* KHỐI TIÊU ĐỀ THÀNH CÔNG */}
                    <div className="text-center mb-8">
                        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800">Đặt lịch và Thanh toán thành công!</h1>
                        <p className="text-gray-500 mt-2">Mã lịch hẹn: #{orderId}</p>
                    </div>

                    {/* THÔNG TIN CHÍNH */}
                    <div className="border-b pb-4 mb-6">
                        <div className="flex items-center">
                            <img 
                                src={bookingDetails.mainImage} 
                                alt="Avatar" 
                                className="w-10 h-10 rounded-full mr-3" 
                            />
                            <div>
                                <div className="font-semibold text-gray-800">{displayMainTitle}</div>
                                <div className="text-sm text-gray-500">{bookingDetails.mainAddress}</div>
                            </div>
                        </div>
                    </div>

                    {/* THÔNG TIN ĐẶT LỊCH */}
                    <h2 className="font-bold text-lg mb-4 text-gray-800">Thông tin đặt lịch</h2>
                    <div className="space-y-2 mb-8 text-sm">
                        <div className="flex justify-between border-b pb-1">
                            <span className="text-gray-600">Ngày</span>
                            <span className="font-medium">{bookingDetails.date}</span>
                        </div>
                        <div className="flex justify-between pb-1">
                            <span className="text-gray-600">Giờ khám</span>
                            <span className="font-medium text-green-600">{bookingDetails.time}</span>
                        </div>
                    </div>

                    {/* THÔNG TIN BỆNH NHÂN */}
                    <h2 className="font-bold text-lg mb-4 text-gray-800">Thông tin bệnh nhân</h2>
                    <div className="space-y-2 mb-8 text-sm">
                        <div className="flex justify-between border-b pb-1">
                            <span className="text-gray-600">Bệnh nhân</span>
                            <span className="font-medium">{bookingDetails.patient.name}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                            <span className="text-gray-600">Ngày sinh</span>
                            <span className="font-medium">{bookingDetails.patient.dob}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                            <span className="text-gray-600">Giới tính</span>
                            <span className="font-medium">{bookingDetails.patient.gender}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                            <span className="text-gray-600">Địa chỉ</span>
                            <span className="font-medium">{bookingDetails.patient.address}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Ghi chú</span>
                            <span className="font-medium">{bookingDetails.patient.note}</span>
                        </div>
                    </div>

                    {/* NÚT HÀNH ĐỘNG */}
                    <div className="flex justify-between mt-8 space-x-4">
                        
                        <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                            onClick={()=>navigate("/")}
                        >
                            Về trang chủ
                        </button>
                    </div>

                </div>
            </div>
            <HomeFooter />
        </>
    );
};

export default CompletePayment;