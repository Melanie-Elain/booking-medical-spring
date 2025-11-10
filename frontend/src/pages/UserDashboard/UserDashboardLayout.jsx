import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from '../../components/Home/Header';
import HomeFooter from '../../components/Home/HomeFooter';
import { FaRegUserCircle } from 'react-icons/fa';

// Component Sidebar (menu bên trái)
const ProfileSidebar = () => {
  const userName = localStorage.getItem('userName') || 'Tài khoản';
  const userPhone = localStorage.getItem('userPhone') || localStorage.getItem('rememberedPhone');

  const handleLogout = () => {
    // Xóa hết thông tin đăng nhập
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('rememberedPhone');
    window.location.href = '/'; // Tải lại trang
  };

  const getNavLinkClass = ({ isActive }) =>
    `block w-full text-left px-4 py-3 rounded-lg transition-colors duration-150 ${
      isActive
        ? 'bg-blue-50 text-blue-600 font-semibold'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center gap-3 p-2 mb-4">
        <FaRegUserCircle size={36} className="text-gray-400" />
        <div>
          <div className="text-sm font-semibold text-gray-800">{userName}</div>
          <div className="text-xs text-gray-500">{userPhone}</div>
        </div>
      </div>

      <nav className="flex flex-col space-y-1">
        {/* Sửa lại đường dẫn "to" cho đúng */}
        <NavLink to="/user/appointments" className={getNavLinkClass}>
          Lịch khám
        </NavLink>
        <NavLink to="/user/payment-history" className={getNavLinkClass}>
          Lịch sử thanh toán
        </NavLink>
        <NavLink to="/user/profile" className={getNavLinkClass}>
          Hồ sơ
        </NavLink>
        <NavLink to="/user/account" className={getNavLinkClass}>
          Tài khoản
        </NavLink>
        <div className="border-t border-gray-200 my-2"></div>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors duration-150"
        >
          Đăng xuất
        </button>
      </nav>
    </div>
  );
};

// Component Layout chính
const UserDashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <ProfileSidebar />
          </div>
          <div className="col-span-3">
            <Outlet /> {/* Render trang con (ProfilePage, AccountPage, v.v.) */}
          </div>
        </div>
      </main>
      <HomeFooter />
    </div>
  );
};

export default UserDashboardLayout;