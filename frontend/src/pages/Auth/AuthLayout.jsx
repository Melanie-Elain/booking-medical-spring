import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';

// Component layout chung cho cả Đăng nhập và Đăng ký
const AuthLayout = ({ children, title, subtitle, imageUrl, imageAlt }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      
      {/* Cột Trái: Thông tin quảng bá / Hình ảnh minh họa */}
      <div className="md:w-5/12 lg:w-4/12 bg-white flex flex-col items-center justify-center p-8 shadow-2xl relative overflow-hidden">
        {/* Nền bong bóng / gradient nhẹ nhàng */}
        <div className="absolute inset-0 bg-blue-50/50 mix-blend-multiply opacity-70"></div>
        
        <div className="relative z-10 text-center max-w-sm">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Đặt khám dễ dàng hơn
          </h1>
          <p className="text-gray-600 mb-8 text-lg font-light">
            trên ứng dụng YouMed với hơn 600 bác sĩ, 100 phòng khám, 25 bệnh viện
          </p>
          
          {/* Khu vực QR Code minh họa (sử dụng placeholder) */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform transition duration-500 hover:scale-[1.02]">
            <img 
                src="https://placehold.co/200x200/4F46E5/ffffff?text=QR+Code" 
                alt="QR Code Tải App" 
                className="w-48 h-48 mx-auto rounded-lg mb-4 shadow-lg"
            />
            <p className="text-indigo-600 font-semibold text-base">
                Quét QR Code tải app
            </p>
          </div>
          
          {/* Icon minh họa */}
          <div className="flex justify-around mt-8 text-blue-500">
            <LogIn size={32} className="p-1.5 bg-blue-100 rounded-full shadow-lg" />
            <UserPlus size={32} className="p-1.5 bg-blue-100 rounded-full shadow-lg" />
          </div>
          
        </div>
      </div>

      {/* Cột Phải: Khu vực Form (Login/Register) */}
      <div className="md:w-7/12 lg:w-8/12 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-100">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-500 mb-8">{subtitle}</p>

          {children}

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
