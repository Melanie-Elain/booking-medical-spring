import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import {  User, Lock, LogIn } from 'lucide-react';

// Cảnh báo: Đã thay thế alert() bằng một thông báo console.log() và đoạn code UI giả lập do quy tắc an toàn.
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic gọi API đăng ký ở đây
    console.log('Đang thực hiện Đăng ký với:', { name, password, phone });
    setMessage('Đăng ký thành công (logic giả lập). Vui lòng kiểm tra tin nhắn!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <AuthLayout
      title="Tạo tài khoản mới"
      subtitle="Đăng ký để bắt đầu đặt lịch khám bệnh dễ dàng"
    >
      {/* Hiển thị thông báo (thay thế cho alert) */}
      {message && (
        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Trường Họ và Tên */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Họ và Tên
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              placeholder="Ví dụ: Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* 2. Trường Số điện thoại */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Số điện thoại
          </label>
          <div className="relative">
            <input
              id="phone"
              type="text"
              placeholder="Nhập số điện thoại (dùng để đăng nhập)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <LogIn size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* 3. Trường Mật khẩu */}
        <div>
          <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              id="reg-password"
              type="password"
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* 4. Nút Đăng ký */}
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
        >
          Đăng ký tài khoản
        </button>
        
        {/* 5. Chuyển sang Đăng nhập */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <a href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition duration-150">
            Đăng nhập ngay
          </a>
        </p>
        
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
