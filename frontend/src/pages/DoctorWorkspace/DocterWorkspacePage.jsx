import React, { useState, useEffect } from "react"; // 1. Thêm useEffect
import { useNavigate } from "react-router-dom"; // 2. Thêm useNavigate
import "../../assets/Home/DocterWorkspace.css";
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
import { getCurrentUser } from "../../api/auth"; // 3. Import API

// --- COMPONENT CON CHO CÁC MỤC ---
// (Các component con: OverviewDashboard, AppointmentManagement, ... giữ nguyên như code gốc của bạn)
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
  const [activeView, setActiveView] = useState("tongquan");

  // --- 4. THÊM CÁC STATE MỚI ---
  const [doctorInfo, setDoctorInfo] = useState(null); // Lưu thông tin bác sĩ
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const navigate = useNavigate(); // Dùng để điều hướng

  // --- 5. THÊM LOGIC BẢO VỆ VÀ FETCH DATA ---
  useEffect(() => {
    // 1. Kiểm tra Token và Role ngay khi tải
    const token = localStorage.getItem("jwtToken");
    const role = localStorage.getItem("userRole");

    if (!token || (role !== "BACSI" && role !== "ADMIN")) { 
      // 2. Nếu không có token, hoặc role không đúng -> đá về trang login
      navigate("/doctor-login", { replace: true });
    } else {
      // 3. Nếu có token và đúng role -> gọi API lấy thông tin
      const fetchDoctorData = async () => {
        try {
          const data = await getCurrentUser(); // Gọi API từ auth.js
          setDoctorInfo(data); // Lưu thông tin vào state
        } catch (error) {
          console.error("Không thể lấy thông tin bác sĩ:", error);
          // Lỗi 401 (token hết hạn) sẽ được axiosConfig xử lý tự động
        } finally {
          setIsLoading(false); // Dừng loading
        }
      };
      fetchDoctorData();
    }
  }, [navigate]); // Thêm navigate vào dependency array


  // Hàm để render nội dung chính dựa trên 'activeView'
  const renderMainContent = () => {
    // ... (Giữ nguyên hàm switch...case) ...
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

  // --- 6. THÊM HÀM ĐĂNG XUẤT ---
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    // Gửi sự kiện để các tab khác (nếu có) biết
    window.dispatchEvent(new Event("authChange")); 
    // Về trang login bác sĩ
    navigate("/doctor-login", { replace: true });
  };

  // --- 7. THÊM TRẠNG THÁI LOADING ---
  if (isLoading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            Đang xác thực và tải dữ liệu Bác sĩ...
        </div>
    );
  }

  // --- 8. CHUẨN BỊ DỮ LIỆU ĐỘNG ---
  // Lấy dữ liệu từ state, nếu chưa có thì dùng "..."
  const doctorName = doctorInfo ? doctorInfo.fullName : "Bác sĩ";
  const doctorPhone = doctorInfo ? doctorInfo.phoneNumber : "...";
  const doctorAvatar = doctorInfo
    ? doctorInfo.fullName.split(" ").pop().charAt(0) // Lấy chữ cái đầu của tên
    : "B";

  return (
    <div className="doctor-dashboard">
      {/* --- SIDEBAR BÊN TRÁI --- */}
      <div className="dashboard-sidebar">
        {/* Logo/User Info (ĐÃ CẬP NHẬT DỮ LIỆU ĐỘNG) */}
        <div className="sidebar-header">
          <div className="user-avatar">{doctorAvatar}</div>
          <div>
            <span className="user-name">{doctorName}</span>
            <span className="user-phone">{doctorPhone}</span>
          </div>
          <ChevronDown size={18} />
        </div>

        {/* Menu chính (Giữ nguyên) */}
        <nav className="sidebar-nav">
          <a
            href="#"
            className={`nav-item-DW ${activeView === "tongquan" ? "active" : ""}`}
            onClick={() => setActiveView("tongquan")}
          >
            <LayoutDashboard size={20} />
            <span>Tổng quan</span>
          </a>
{/* ... (Giữ nguyên các mục nav-item-DW khác) ... */}
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

        {/* Footer Sidebar (ĐÃ CẬP NHẬT onClick) */}
        <div className="sidebar-footer">
          <a href="#" onClick={handleLogout} className="nav-item-DW logout-btn">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </a>
        </div>
      </div>

      {/* --- NỘI DUNG CHÍNH BÊN PHẢI (ĐÃ CẬP NHẬT DỮ LIỆU ĐỘNG) --- */}
      <div className="dashboard-main">
        {/* Header của nội dung chính */}
        <header className="main-header-DW">
          <h1 className="text-xl font-semibold">
            Chào mừng, Bác sĩ {doctorName}!
          </h1>
          <div className="header-actions">
            <button className="action-btn">
              <Mail size={20} />
            </button>
            <button className="action-btn">
              <Bell size={20} />
            </button>
            <div className="action-btn user-avatar-btn">{doctorAvatar}</div>
          </div>
        </header>

        {/* Vùng nội dung được render động */}
        <main className="main-content-DW">{renderMainContent()}</main>
      </div>
    </div>
  );
};

export default DoctorWorkspacePage;