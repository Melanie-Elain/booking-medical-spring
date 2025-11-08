import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Component con để hiển thị 1 hàng thông tin
const InfoRow = ({ label, value }) => (
  <div className="flex">
    <span className="w-1/3 text-gray-500">{label}</span>
    <span className="w-2/3 font-medium text-gray-800">{value}</span>
  </div>
);

const AccountPage = () => {
  // Đây là data mẫu. Sau này bạn sẽ fetch từ API
  const accountInfo = {
    fullName: 'Trần Bảo Hân',
    phone: '0867223625',
    dob: '06/10/2025',
    address: '219/52A, Phường 1, Quận 8, Hồ Chí Minh',
    cccd: '066304007455',
    maBHYT: '--',
  };

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

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
              <InfoRow label="Số điện thoại" value={accountInfo.phone} />
              <InfoRow label="Ngày sinh" value={accountInfo.dob} />
              <InfoRow label="CMND/CCCD" value={accountInfo.cccd} />
              <InfoRow label="Mã BHYT" value={accountInfo.maBHYT} />
            </div>
            <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">
              Thay đổi thông tin
            </button>
          </div>

          {/* Cột 2: Thay đổi mật khẩu */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Thay đổi mật khẩu</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu hiện tại <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showOldPass ? 'text' : 'password'}
                    placeholder="Mật khẩu hiện tại của bạn"
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