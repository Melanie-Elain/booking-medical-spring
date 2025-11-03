import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import { Eye, EyeOff } from 'lucide-react';
import Header from '../../components/Home/Header';
import HomeFooter from '../../components/Home/HomeFooter';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Đang thực hiện Đăng nhập với:', { phoneNumber, password, rememberMe });
    alert('Đăng nhập thành công (logic giả lập)');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-grow">
        <AuthLayout
          title="Đăng nhập tài khoản"
          subtitle="Chào mừng bạn quay trở lại YouMed"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Trường Số điện thoại */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Số điện thoại
              </label>
              <input
                id="phone"
                type="text"
                placeholder="Nhập số điện thoại của bạn"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>

            {/* 2. Trường Mật khẩu */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pr-12 transition duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-150"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* 3. Tùy chọn Ghi nhớ và Quên mật khẩu */}
            <div className="flex items-center justify-between text-sm">
              <label
                htmlFor="remember"
                className="flex items-center space-x-2 text-gray-600 cursor-pointer"
              >
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span>Ghi nhớ mật khẩu</span>
              </label>
              <a
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150"
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* 4. Nút Đăng nhập */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              Đăng nhập
            </button>

            {/* 5. Chuyển sang Đăng ký */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <a
                href="/register"
                className="font-bold text-indigo-600 hover:text-indigo-500 transition duration-150"
              >
                Đăng ký ngay
              </a>
            </p>
          </form>
        </AuthLayout>
      </main>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

export default LoginPage;
