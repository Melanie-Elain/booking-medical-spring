import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/auth'; // Giả định import tuyệt đối
import { Eye, EyeOff } from 'lucide-react';

const DoctorLoginPage = () => {
  const [username, setUsername] = useState(''); // SĐT hoặc Email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const loginData = { username, password };
      // Sử dụng lại hàm loginUser, vì API endpoint là một
      const response = await loginUser(loginData); 

      // --- KIỂM TRA QUYỀN BÁC SĨ ---
      // Dựa trên CSDL (medical_booking.sql), role Bác sĩ là 'BACSI'
      if (response.role !== 'BACSI' && response.role !== 'ADMIN') {
        setError('Tài khoản này không có quyền Bác sĩ hoặc Admin.');
        return; 
      }
      
      // Đăng nhập thành công (Đúng là Bác sĩ hoặc Admin)
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('userName', response.fullName);
      localStorage.setItem('userRole', response.role);

      // Gửi sự kiện để các component khác (như dashboard) biết
      window.dispatchEvent(new Event('authChange'));

      // Chuyển hướng đến trang làm việc của Bác sĩ
      navigate('/doctor-workspace', { replace: true });

    } catch (err) {
      console.error('Lỗi đăng nhập Bác sĩ:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 404)) {
        setError('Sai tên đăng nhập hoặc mật khẩu.');
      } else {
        setError('Không thể kết nối tới máy chủ. Vui lòng thử lại.');
      }
    }
  };

  return (
    // Sử dụng class Tailwind trực tiếp
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <img 
          src="/images/logo-doctorworkspace.png" 
          alt="Doctor Workspace Logo" 
          className="w-48 h-auto mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Đăng nhập Bác sĩ</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Chào mừng bạn quay trở lại.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-center text-sm text-red-600 font-medium bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="w-full">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại / Email
            </label>
            <input
              id="username"
              type="text"
              placeholder="Nhập số điện thoại hoặc email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
          
          <div className="flex justify-end text-sm">
            <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150">
                Quên mật khẩu?
            </Link>
          </div>

          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200">
            Đăng nhập
          </button>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Quay lại trang chủ? <Link to="/" className="font-bold text-indigo-600 hover:text-indigo-500 transition duration-150">Trang chủ</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default DoctorLoginPage;