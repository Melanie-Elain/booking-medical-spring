import React, { useState } from "react";
// Import CSS (ĐÃ SỬA LẠI ĐƯỜNG DẪN TƯƠNG ĐỐI)
import "../../assets/Home/DocterWorkspace.css";
// Import icons
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  Settings,
  BarChart3,
  ChevronDown,
  Bell,
  Mail,
  LogOut,
  CalendarClock,
  Users,
} from "lucide-react";

// --- COMPONENT CON CHO CÁC MỤC ---
// 1. Component "Tổng quan" (Nội dung chính)
const OverviewDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Báo cáo tổng quan</h2>
      {/* Tabs Hôm nay, 7 ngày... */}
      <div className="flex border-b mb-4">
        <button className="py-2 px-4 text-blue-600 border-b-2 border-blue-600 font-semibold">
          Hôm nay
        </button>
        <button className="py-2 px-4 text-gray-500 hover:text-gray-700">
          7 ngày qua
        </button>
        <button className="py-2 px-4 text-gray-500 hover:text-gray-700">
          30 ngày qua
        </button>
      </div>

      {/* 4 Thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Thẻ 1: Doanh thu */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">TỔNG DOANH THU</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-400">Lượt khám: 0</p>
        </div>
        {/* Thẻ 2: Phòng khám */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <h3 className="text-sm font-medium text-gray-500">PHÒNG KHÁM</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-400">Ký trước: 0</p>
        </div>
        {/* Thẻ 3: Dịch vụ trực tuyến */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">DỊCH VỤ TRỰC TUYẾN</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-400">Cuộc gọi: 0 | Tin nhắn: 0</p>
        </div>
        {/* Thẻ 4: Doanh thu dịch vụ */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">DOANH THU DỊCH VỤ</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-400">Đơn thuốc: 0 | Chỉ định: 0</p>
        </div>
      </div>

      {/* Các biểu đồ (placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow h-64">
          <h3 className="font-semibold">Lượt bệnh nhân đến khám</h3>
          {/* (Nơi để biểu đồ) */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow h-64">
          <h3 className="font-semibold">Tỉ lệ khách mới/cũ</h3>
          {/* (Nơi để biểu đồ) */}
        </div>
      </div>
    </div>
  );
};

// 2. Component "Quản lý Lịch khám" (Placeholder)
const AppointmentManagement = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Lịch khám</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p>
          Đây là nơi hiển thị danh sách lịch khám. Bác sĩ có thể xem, xác nhận,
          hoặc hủy lịch hẹn...
        </p>
      </div>
    </div>
  );
};

// 3. Component "Hồ sơ Bác sĩ" (Placeholder)
const DoctorProfileManagement = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Hồ sơ Bác sĩ</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p>
          Đây là nơi bác sĩ có thể xem và chỉnh sửa thông tin cá nhân, chuyên
          khoa, kinh nghiệm...
        </p>
      </div>
    </div>
  );
};

// 4. Component "Quản lý Lịch làm việc" (Placeholder)
const ScheduleManagement = () => {
     return (
       <div>
         <h2 className="text-2xl font-bold mb-4">Quản lý Lịch làm việc</h2>
         <div className="bg-white p-4 rounded-lg shadow">
           <p>
             Đây là nơi bác sĩ thêm/sửa/xóa các khung giờ làm việc
             hàng tuần.
           </p>
         </div>
       </div>
     );
   };

// --- COMPONENT CHÍNH (LAYOUT) ---
const DoctorWorkspacePage = () => {
  // 'activeView' sẽ quản lý nội dung nào đang được hiển thị
  // 'tongquan' là giá trị mặc định khi tải trang
  const [activeView, setActiveView] = useState("tongquan");

  // Hàm để render nội dung chính dựa trên 'activeView'
  const renderMainContent = () => {
    switch (activeView) {
      case "tongquan":
        return <OverviewDashboard />;
      case "lichkham":
        return <AppointmentManagement />;
      case "lichlamviec":
        return <ScheduleManagement />;
      case "hosobacsi":
        return <DoctorProfileManagement />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="doctor-dashboard">
      {/* --- SIDEBAR BÊN TRÁI --- */}
      <div className="dashboard-sidebar">
        {/* Logo/User Info */}
        <div className="sidebar-header">
          <div className="user-avatar">NH</div>
          <div>
            <span className="user-name">Ngô Trường Hiếu</span>
            <span className="user-phone">0911647047</span>
          </div>
          <ChevronDown size={18} />
        </div>

        {/* Menu chính */}
        <nav className="sidebar-nav">
          <a
            href="#"
            className={`nav-item-DW ${activeView === "tongquan" ? "active" : ""}`}
            onClick={() => setActiveView("tongquan")}
          >
            <LayoutDashboard size={20} />
            <span>Tổng quan</span>
          </a>

          <p className="nav-group-title">PHÒNG KHÁM</p>
          <a
            href="#"
            className={`nav-item-DW ${activeView === "lichkham" ? "active" : ""}`}
            onClick={() => setActiveView("lichkham")}
          >
            <CalendarCheck size={20} />
            <span>Quản lý Lịch khám</span>
          </a>
          <a
            href="#"
            className={`nav-item-DW ${activeView === "hosobenhnhan" ? "active" : ""}`}
            onClick={() => setActiveView("hosobenhnhan")}
          >
            <Users size={20} />
            <span>Hồ sơ Bệnh nhân</span>
          </a>

          <p className="nav-group-title">ĐẶT KHÁM THÔNG MINH</p>
           <a
            href="#"
            className={`nav-item-DW ${activeView === "lichlamviec" ? "active" : ""}`}
            onClick={() => setActiveView("lichlamviec")}
          >
            <CalendarClock size={20} />
            <span>Lịch làm việc</span>
          </a>
          
          <a
            href="#"
            className={`nav-item-DW ${activeView === "hosobacsi" ? "active" : ""}`}
            onClick={() => setActiveView("hosobacsi")}
          >
            <User size={20} />
            <span>Hồ sơ Bác sĩ</span>
          </a>
          <a
            href="#"
            className={`nav-item-DW ${activeView === "thongke" ? "active" : ""}`}
            onClick={() => setActiveView("thongke")}
          >
            <BarChart3 size={20} />
            <span>Thống kê</span>
          </a>
        </nav>

        {/* Footer Sidebar */}
        <div className="sidebar-footer">
          <a href="/logout" className="nav-item-DW logout-btn">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </a>
        </div>
      </div>

      {/* --- NỘI DUNG CHÍNH BÊN PHẢI --- */}
      <div className="dashboard-main">
        {/* Header của nội dung chính */}
        <header className="main-header-DW">
          <h1 className="text-xl font-semibold">
            Chào mừng, Bác sĩ Ngô Trường Hiếu!
          </h1>
          <div className="header-actions">
            <button className="action-btn">
              <Mail size={20} />
            </button>
            <button className="action-btn">
              <Bell size={20} />
            </button>
            <div className="action-btn user-avatar-btn">NH</div>
          </div>
        </header>

        {/* Vùng nội dung được render động */}
        <main className="main-content-DW">{renderMainContent()}</main>
      </div>
    </div>
  );
};

export default DoctorWorkspacePage;