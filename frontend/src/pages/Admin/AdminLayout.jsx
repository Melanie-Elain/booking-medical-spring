import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from '../../components/Home/Header';
import HomeFooter from '../../components/Home/HomeFooter';
import { FaUsers, FaUserMd, FaStethoscope, FaHospital, FaClinicMedical } from 'react-icons/fa';
import { BsCalendarCheckFill } from 'react-icons/bs';

// Component Sidebar (menu bên trái)
const AdminSidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/'; 
  };

  // Hàm style cho NavLink, tự động tô đậm link đang active
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-colors duration-150 ${
      isActive
        ? 'bg-blue-50 text-blue-600 font-semibold'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="p-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Trang Admin</h2>
        <p className="text-sm text-gray-500">Quản lý hệ thống</p>
      </div>

      {/* Menu điều hướng Admin */}
      <nav className="flex flex-col space-y-1">
        <NavLink to="/admin/users" className={getNavLinkClass}>
          <FaUsers size={18} />
          <span>Quản lý Người dùng</span>
        </NavLink>
        <NavLink to="/admin/specialties" className={getNavLinkClass}>
          <FaStethoscope size={18} />
          <span>Quản lý Chuyên khoa</span>
        </NavLink>
        <NavLink to="/admin/doctors" className={getNavLinkClass}>
          <FaUserMd size={18} />
          <span>Quản lý Bác sĩ</span>
        </NavLink>
        <NavLink to="/admin/hospitals" className={getNavLinkClass}>
          <FaHospital size={18} />
          <span>Quản lý Bệnh viện</span>
        </NavLink>
        <NavLink to="/admin/clinics" className={getNavLinkClass}>
          <FaClinicMedical size={18} />
          <span>Quản lý Phòng khám</span>
        </NavLink>
        <NavLink to="/admin/appointments" className={getNavLinkClass}>
          <BsCalendarCheckFill size={18} />
          <span>Quản lý Lịch hẹn</span>
        </NavLink>

        
        <div className="border-t border-gray-200 my-2"></div>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors duration-150"
        >
          Đăng xuất
        </button>
      </nav>
    </div>
  );
};

// Component Layout chính
const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cột 1: Sidebar */}
          <div className="col-span-1">
            <AdminSidebar />
          </div>

          {/* Cột 2: Nội dung trang con (ví dụ: UserManagementPage) */}
          <div className="col-span-3">
            <Outlet />
          </div>
        </div>
      </main>
      <HomeFooter />
    </div>
  );
};

export default AdminLayout;