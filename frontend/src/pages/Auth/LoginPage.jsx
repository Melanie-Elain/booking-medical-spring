import React, { useState } from 'react';
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Bên trái: ảnh minh họa và QR */}
          <div className="flex flex-col items-center text-center space-y-6">
            <img
              src="https://youmed.vn/dat-kham/assets/img/booking/png/Login.png"
              alt="YouMed Login Illustration"
              className="w-96 max-w-full"
            />
            <p className="text-gray-700 text-base leading-relaxed">
              Đặt khám <span className="font-semibold text-indigo-600">DỄ DÀNG HƠN</span> <br />
              trên ứng dụng <span className="text-indigo-600 font-semibold">YouMed</span> với hơn{' '}
              <span className="font-semibold">600 bác sĩ</span>,{' '}
              <span className="font-semibold">100 phòng khám</span>,{' '}
              <span className="font-semibold">25 bệnh viện</span>
            </p>
          </div>

          {/* Bên phải: Form đăng nhập */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Đăng nhập</h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Chào mừng bạn quay trở lại YouMed
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Số điện thoại */}
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

              {/* Mật khẩu */}
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

              {/* Ghi nhớ + Quên mật khẩu */}
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

              {/* Nút đăng nhập */}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              >
                Đăng nhập
              </button>

              {/* Đăng ký */}
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
          </div>
        </div>
      </main>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

export default LoginPage;
