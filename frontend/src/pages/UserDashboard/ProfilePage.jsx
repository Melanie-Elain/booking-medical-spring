import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

// Component con để hiển thị 1 hàng thông tin
const InfoRow = ({ label, value }) => (
  <div className="flex">
    <span className="w-1/3 text-gray-500">{label}</span>
    <span className="w-2/3 font-medium text-gray-800">{value}</span>
  </div>
);

const ProfilePage = () => {
  // Đây là data mẫu. Sau này bạn sẽ fetch từ API
  const userProfile = {
    avatar: 'HA', // Chữ cái đầu
    fullName: 'Trần Bảo Hân',
    dob: '06/10/2025',
    gender: 'Nữ',
    address: '219/52A, Phường 1, Quận 8, Hồ Chí Minh',
    phone: '0867223625',
    maBHYT: '--',
    cccd: '066304007455',
    ethnicity: 'Kinh',
    occupation: 'Sinh Viên',
    email: 'azunastart0101@gmail.com',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Hồ sơ</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột 1: Danh sách hồ sơ (giả lập) */}
          <div className="lg:col-span-1 border-r border-gray-200 pr-4">
            <input 
              type="text" 
              placeholder="Tìm nhanh hồ sơ" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center text-lg">
                  {userProfile.avatar}
                </span>
                <div>
                  <div className="font-semibold text-blue-700">{userProfile.fullName}</div>
                  <div className="text-sm text-gray-600">{userProfile.dob}</div>
                </div>
              </div>
              <button className="w-full py-2 px-4 border-2 border-dashed border-blue-400 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
                Thêm hồ sơ
              </button>
            </div>
          </div>

          {/* Cột 2: Chi tiết hồ sơ */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Xem hồ sơ</h3>
              <span className="text-sm text-gray-500">Mã BN: YMP252444492</span>
            </div>

            <div className="bg-orange-50 border border-orange-200 text-orange-700 text-sm p-3 rounded-lg mb-6">
              Hoàn thiện thông tin để đặt khám và quản lý hồ sơ y tế được tốt hơn.
            </div>

            <h4 className="text-md font-semibold text-gray-800 mb-4">Thông tin cơ bản</h4>
            <div className="space-y-3 text-sm">
              <InfoRow label="Họ và tên" value={userProfile.fullName} />
              <InfoRow label="Điện thoại" value={userProfile.phone} />
              <InfoRow label="Ngày sinh" value={userProfile.dob} />
              <InfoRow label="Giới tính" value={userProfile.gender} />
              <InfoRow label="Địa chỉ" value={userProfile.address} />
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <h4 className="text-md font-semibold text-gray-800 mb-4">Thông tin bổ sung</h4>
            <div className="space-y-3 text-sm">
              <InfoRow label="Mã BHYT" value={userProfile.maBHYT} />
              <InfoRow label="Số CMND/CCCD" value={userProfile.cccd} />
              <InfoRow label="Dân tộc" value={userProfile.ethnicity} />
              <InfoRow label="Nghề nghiệp" value={userProfile.occupation} />
              <InfoRow label="Email" value={userProfile.email} />
            </div>

            <div className="flex justify-end mt-8">
              <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Thay đổi thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;