import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { loginUser } from '../../api/auth'; // 
import Header from '../../components/Home/Header';
import HomeFooter from '../../components/Home/HomeFooter';

const LoginPage = () => {
  // 3. Tự động điền SĐT nếu người dùng đã chọn "Ghi nhớ"
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem('rememberedPhone') || ''
  );
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(
    !!localStorage.getItem('rememberedPhone') // Tự động check nếu đã lưu SĐT
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // 4. Thêm state để hiển thị lỗi
  const navigate = useNavigate(); // 5. Khởi tạo navigate

  // 6. HÀM XỬ LÝ ĐĂNG NHẬP THẬT
  // 6. HÀM XỬ LÝ ĐĂNG NHẬP THẬT (ĐÃ SỬA LOGIC CHUYỂN HƯỚNG)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Xóa mọi lỗi cũ

    try {
      // Dữ liệu gửi đi phải khớp với LoginRequest.java
      const loginData = {
        phoneNumber: phoneNumber,
        password: password,
      };

      // response bây giờ là: { token: "...", fullName: "...", role: "ADMIN" }
      const response = await loginUser(loginData); // Gọi API

      // Đăng nhập thành công:
      // 1. Lưu tất cả thông tin vào localStorage
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('userName', response.fullName);
      localStorage.setItem('userRole', response.role);

      // 2. Xử lý "Ghi nhớ mật khẩu"
      if (rememberMe) {
        localStorage.setItem('rememberedPhone', phoneNumber);
      } else {
        localStorage.removeItem('rememberedPhone');
      }

      // 3. Thông báo
      alert('Đăng nhập thành công!');

      // 4. KIỂM TRA ROLE VÀ CHUYỂN HƯỚNG (ĐÃ SỬA)
      if (response.role === 'ADMIN') {
        navigate('/admin'); // Chuyển đến trang Admin
      } else {
        // (Bao gồm BENHNHAN và BACSI)
        navigate('/'); // Chuyển về trang chủ
      }

    } catch (err) {
      // BẮT LỖI TỪ BACKEND (do UserService ném ra)
      console.error('Lỗi đăng nhập:', err);
      if (
        err.response &&
        (err.response.status === 401 || // Unauthorized
          err.response.status === 403 || // Forbidden
          err.response.status === 500) // Lỗi server (thường do sai SĐT/mật khẩu)
      ) {
        // Dùng chung một thông báo lỗi bảo mật
        setError('Sai số điện thoại hoặc mật khẩu.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại!');
      } else {
        setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    }
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

              {/* 7. HIỂN THỊ LỖI NẾU CÓ */}
              {error && (
                <div className="text-center text-sm text-red-600 font-medium">
                  {error}
                </div>
              )}

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