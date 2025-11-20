import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; // 1. Import useNavigate
import { loginUser } from '../../api/auth'; // 
import Header from '../../components/Home/Header';
import HomeFooter from '../../components/Home/HomeFooter';

const LoginPage = () => {
  const [username, setUsername] = useState(
    localStorage.getItem('rememberedUsername') || '' // Sửa tên "remembered"
  );
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(
    !!localStorage.getItem('rememberedUsername')
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(''); 

  //   try {
  //     // 2. Sửa ở đây: gửi username
  //     const loginData = {
  //       username: username, 
  //       password: password,
  //     };

  //     const response = await loginUser(loginData); 

  //     localStorage.setItem('jwtToken', response.token);
  //     localStorage.setItem('userName', response.fullName);
  //     localStorage.setItem('userRole', response.role);

  //     window.dispatchEvent(new Event('authChange'));

  //     // 3. Sửa xử lý "Ghi nhớ"
  //     if (rememberMe) {
  //       localStorage.setItem('rememberedUsername', username);
  //     } else {
  //       localStorage.removeItem('rememberedUsername');
  //     }

  //     alert('Đăng nhập thành công!');

  //     // 4. Chuyển hướng theo Role
  //     if (response.role === 'ADMIN') {
  //       navigate('/admin', { replace: true });
  //     } else {
  //       navigate('/', { replace: true });
  //     }

  //   } catch (err) {
  //     console.error('Lỗi đăng nhập:', err);
  //     // 5. Cập nhật logic bắt lỗi
  //     if (
  //       err.response &&
  //       (err.response.status === 401 || // Unauthorized
  //        err.response.status === 403 || // Forbidden
  //        err.response.status === 404 || // Not Found (từ UsernameNotFoundException)
  //        err.response.status === 500)  // Internal Error (từ Sai mật khẩu)
  //     ) {
  //       setError('Sai tên đăng nhập hoặc mật khẩu.');
  //     } else if (err.code === 'ERR_NETWORK') {
  //       setError('Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại!');
  //     } else {
  //       setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
  //     }
  //   }
  // };
  // ... (các import và state của bạn giữ nguyên) ...

    const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const loginData = {
      username: username,
      password: password,
    };

    // response chứa { token, id, username, email, fullName, roles: [...] }
    const response = await loginUser(loginData);

    // Lấy TOÀN BỘ danh sách vai trò (roles)
    const roles = response.roles;

    if (!roles || roles.length === 0) {
      setError('Không thể xác định vai trò người dùng.');
      return;
    }

    // --- LOGIC CŨ VẪN GIỮ ---
    // Lưu thông tin vào localStorage
    // Ghi chú: Lưu role đầu tiên hoặc role ưu tiên nhất vào localStorage
    // Dưới đây là cách tìm role ưu tiên nhất để lưu, thay vì chỉ lưu roles[0]
    let primaryRole = roles[0]; // Mặc định
    if (roles.includes('ROLE_ADMIN')) primaryRole = 'ROLE_ADMIN';
    else if (roles.includes('ROLE_BACSI')) primaryRole = 'ROLE_BACSI';
    else if (roles.includes('ROLE_PHONGKHAM')) primaryRole = 'ROLE_PHONGKHAM';
    else if (roles.includes('ROLE_BENHVIEN')) primaryRole = 'ROLE_BENHVIEN';

    localStorage.setItem('jwtToken', response.token);
    localStorage.setItem('userName', response.fullName);
    localStorage.setItem('userRole', primaryRole); // Lưu role ưu tiên nhất
    localStorage.setItem('userId', response.id);

    window.dispatchEvent(new Event('authChange'));

    if (rememberMe) {
      localStorage.setItem('rememberedUsername', username);
    } else {
      localStorage.removeItem('rememberedUsername');
    }

    alert('Đăng nhập thành công!');

    // --- SỬA LẠI HOÀN TOÀN LOGIC ĐIỀU HƯỚNG ---
    // Luôn kiểm tra vai trò ưu tiên cao nhất (ADMIN) trước
    // bằng cách dùng 'roles.includes()' thay vì 'userRole ==='

    if (roles.includes('ROLE_ADMIN')) {
      navigate('/admin', { replace: true });
    } else if (roles.includes('ROLE_BACSI')) {
      navigate('/doctor-workspace-page', { replace: true });
    } else if (roles.includes('ROLE_PHONGKHAM')) {
      navigate('/clinic-workspace-page', { replace: true });
    } else if (roles.includes('ROLE_BENHVIEN')) {
      navigate('/hospital-workspace-page', { replace: true });
    } else if (roles.includes('ROLE_BENHNHAN')) {
      navigate('/', { replace: true }); // Chuyển hướng rõ ràng cho bệnh nhân
    } else {
      navigate('/', { replace: true }); // Mặc định cho các trường hợp khác
    }

  } catch (err) {
    console.error('Lỗi đăng nhập:', err);

    if (
      err.response &&
      (err.response.status === 401 ||
        err.response.status === 403 ||
        err.response.status === 404)
    ) {
      setError('Sai tên đăng nhập hoặc mật khẩu.');
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
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Số điện thoại / Email
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Nhập số điện thoại hoặc email của bạn"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                <Link
                  to="/register"
                  className="font-bold text-indigo-600 hover:text-indigo-500 transition duration-150"
                >
                  Đăng ký ngay
                </Link>
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