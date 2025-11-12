import React from 'react';
import { FaFileInvoice } from 'react-icons/fa'; // Icon

const AppointmentsPage = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Lịch khám</h2>
        <button className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
          Lọc
        </button>
      </div>
      <input 
        type="text" 
        placeholder="Mã giao dịch, tên dịch vụ, tên bệnh nhân,..." 
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      />
      {/* Trạng thái trống */}
      <div className="text-center py-16">
        <FaFileInvoice size={60} className="mx-auto text-gray-300" />
        <p className="mt-4 text-gray-500">Lịch khám của bạn trống !</p>
      </div>
    </div>
  );
};

export default AppointmentsPage;