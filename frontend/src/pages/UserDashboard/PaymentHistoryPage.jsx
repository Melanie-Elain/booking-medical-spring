import React from 'react';
import { FaFileInvoiceDollar } from 'react-icons/fa'; // Icon

const PaymentHistoryPage = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Lịch sử thanh toán</h2>
      </div>
      <input 
        type="text" 
        placeholder="Mã giao dịch, tên dịch vụ, tên bệnh nhân, số điện thoại,..." 
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      />
      {/* Trạng thái trống */}
      <div className="text-center py-16">
        <FaFileInvoiceDollar size={60} className="mx-auto text-gray-300" />
        <p className="mt-4 text-gray-500">Chưa có thông tin thanh toán</p>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;