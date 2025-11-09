import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import { Eye, EyeOff } from 'lucide-react';
import axiosInstance from '../../api/axiosConfig';

// Component con để hiển thị 1 hàng thông tin
const InfoRow = ({ label, value }) => (
  <div className="flex py-2">
    <span className="w-1/3 text-gray-500">{label}</span>
    <span className="w-2/3 font-medium text-gray-800">{value || '--'}</span>
  </div>
);

const AccountPage = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // State cho form đổi mật khẩu
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // State cho việc ẩn/hiện password
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Dùng useEffect để gọi API khi trang được tải
  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await axiosInstance.get('/user/me');
        setAccountInfo(response.data); 
      } catch (error) {
        console.error("Lỗi khi lấy thông tin tài khoản:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchAccountInfo();
  }, []); // [] = Chỉ chạy 1 lần khi component tải xong

  // Hàm xử lý khi nhấn nút "Thay đổi"
  const handleChangePassword = async (e) => {
    e.preventDefault(); 
    setFormError('');
    setFormSuccess('');

    if (!oldPassword || !newPassword) {
      setFormError('Vui lòng nhập đầy đủ mật khẩu.');
      return;
    }

    try {
      const response = await axiosInstance.post('/user/change-password', {
        oldPassword: oldPassword,
        newPassword: newPassword
      });

      setFormSuccess(response.data || 'Đổi mật khẩu thành công!');
      setOldPassword(''); 
      setNewPassword('');
    } catch (error) {
      setFormError(error.response?.data || 'Đã có lỗi xảy ra.');
    }
  };

  // Hiển thị trạng thái Loading...
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Tài khoản</h2>
        <div>Đang tải thông tin...</div>
      </div>
    );
  }

  // Hiển thị nếu không tải được data
  if (!accountInfo) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Tài khoản</h2>
        <div>Không thể tải thông tin tài khoản.</div>
      </div>
    );
  }

  // Giao diện chính (đã có data)
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Tài khoản</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột 1: Thông tin tài khoản */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Thông tin tài khoản</h3>
            <div className="space-y-4 text-sm">
              <InfoRow label="Họ và tên" value={accountInfo.fullName} />
              <InfoRow label="Số điện thoại" value={accountInfo.phoneNumber} />
              <InfoRow label="Ngày sinh" value={accountInfo.dob} />
              <InfoRow label="CMND/CCCD" value={accountInfo.idCard} />
              <InfoRow label="Mã BHYT" value={accountInfo.healthInsurance} />
            </div>
            
           
            <Link 
              to="/user/profile" 
              className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
            >
              Thay đổi thông tin
            </Link>

          </div>

          {/* Cột 2: Thay đổi mật khẩu */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Thay đổi mật khẩu</h3>
            <form className="space-y-4" onSubmit={handleChangePassword}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu hiện tại <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showOldPass ? 'text' : 'password'}
                    placeholder="Mật khẩu hiện tại của bạn"
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPass(!showOldPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  >
                    {showOldPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu mới <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  >
                    {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Hiển thị thông báo Lỗi hoặc Thành công */}
              {formError && <div className="text-sm text-red-600">{formError}</div>}
              {formSuccess && <div className="text-sm text-green-600">{formSuccess}</div>}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;