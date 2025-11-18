import React, { useState, useEffect } from "react";
// 1. Import CSS đã đổi tên
import "../../assets/Home/HospitalWorkspace.css";
import { useNavigate } from "react-router-dom";
import HospitalAppointment from "./HospitalAppointmentManagementPage";
import HospitalScheduleManagement from "./HospitalScheduleManagement";

// 2. Import icons (giữ nguyên)
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
  Stethoscope,
  Briefcase,
} from "lucide-react";
import HospitalProfileManagement from "./HospitalProfileManagement";

// --- COMPONENT CON (Giữ nguyên, chúng là component nội bộ) ---
// TÌM COMPONENT NÀY VÀ THAY THẾ NÓ
const HospitalOverview = () => {
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



const DoctorScheduleMgmt = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Lịch làm việc</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p>Sắp xếp lịch làm việc cho các bác sĩ/chuyên khoa...</p>
      </div>
    </div>
  );
};

// --- COMPONENT CHÍNH  ---
const HospitalWorkspacePage = () => {
  const [activeView, setActiveView] = useState("tongquan");
  const navigate = useNavigate();

  const [hospitalName, setHospitalName] = useState(
       localStorage.getItem("userName") || "Bệnh viện"
    );
  
      // 2. Lắng nghe sự kiện 'authChange' (bạn đã tạo ở hàm logout)
      //    để cập nhật tên ngay lập tức khi đăng nhập/đăng xuất
      useEffect(() => {
        const handleAuthChange = () => {
          const newName = localStorage.getItem("userName") || "Bệnh viện";
          setHospitalName(newName);
        };
  
        window.addEventListener("authChange", handleAuthChange);
  
        // Dọn dẹp listener
        return () => {
          window.removeEventListener("authChange", handleAuthChange);
        };
      }, []); // Mảng rỗng đảm bảo chỉ chạy 1 lần khi mount
  
      // 3. Hàm helper để lấy chữ cái viết tắt
      const getInitials = (name) => {
        if (!name) return "?";
        const words = name.trim().split(' ');
        if (words.length === 0 || words[0] === "") return "?";
        if (words.length === 1) {
          return words[0].charAt(0).toUpperCase();
        }
        // Lấy chữ cái đầu của từ đầu tiên và từ cuối cùng
        const firstInitial = words[0].charAt(0).toUpperCase();
        const lastInitial = words[words.length - 1].charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
      };
  
      // 4. Tính toán chữ viết tắt từ state
      const hospitalInitials = getInitials(hospitalName);

  // 3. TẠO HÀM XỬ LÝ ĐĂNG XUẤT
  const handleLogout = () => {
    // Xóa tất cả thông tin đăng nhập
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    
    // (Nếu bạn có "rememberMe", cũng hãy xóa nó)
    // localStorage.removeItem('rememberedUsername');

    // Bắn sự kiện "authChange" để Header tự động cập nhật
    window.dispatchEvent(new Event('authChange'));

    // Chuyển hướng về trang chủ
    navigate('/', { replace: true });
  };

  
  // Hàm render nội dung (giữ nguyên logic)
  const renderMainContent = () => {
    switch (activeView) {
      case "tongquan":
        return <HospitalOverview />;
      case "lichkham":
        return <HospitalAppointment />;
      // case "quanlybacsi":
      //   return <DoctorManagement />;
      case "quanlyhoso":
        return <HospitalProfileManagement />;
      case "lichlamviec":
        return <HospitalScheduleManagement />;
      default:
        return <HospitalOverview />;
    }
  };

  // 3. TẤT CẢ className ĐÃ ĐỔI TỪ "hm-" SANG "hwp-"
  return (
    <div className="hwp-dashboard">
      {/* --- SIDEBAR BÊN TRÁI --- */}
      <div className="hwp-sidebar">
        {/* Logo/User Info */}
        <div className="hwp-sidebar-header">
          <div className="hwp-user-avatar">{hospitalInitials}</div>
          <div>
            <span className="hwp-user-name">{hospitalName}</span>
          </div>
          <ChevronDown size={18} />
        </div>

        {/* Menu chính */}
        <nav className="hwp-sidebar-nav">
          <a
            href="#"
            className={`hwp-nav-item ${activeView === "tongquan" ? "active" : ""}`}
            onClick={() => setActiveView("tongquan")}
          >
            <LayoutDashboard size={20} />
            <span>Tổng quan</span>
          </a>

          <p className="hwp-nav-group-title">NGHIỆP VỤ</p>
          <a
            href="#"
            className={`hwp-nav-item ${activeView === "lichkham" ? "active" : ""}`}
            onClick={() => setActiveView("lichkham")}
          >
            <CalendarCheck size={20} />
            <span>Quản lý Lịch khám</span>
          </a>

          <p className="hwp-nav-group-title">QUẢN LÝ BỆNH VIỆN</p>
          
          <a
            href="#"
            className={`hwp-nav-item ${activeView === "quanlyhoso" ? "active" : ""}`}
            onClick={() => setActiveView("quanlyhoso")}
          >
            <Briefcase size={20} />
            <span>Quản lý Hồ sơ</span>
          </a>
          <a
            href="#"
            className={`hwp-nav-item ${activeView === "lichlamviec" ? "active" : ""}`}
            onClick={() => setActiveView("lichlamviec")}
          >
            <CalendarClock size={20} />
            <span>Lịch làm việc</span>
          </a>

          <a
            href="#"
            className={`hwp-nav-item ${activeView === "thongke" ? "active" : ""}`}
            onClick={() => setActiveView("thongke")}
          >
            <BarChart3 size={20} />
            <span>Thống kê</span>
          </a>
        </nav>

        {/* Footer Sidebar */}
        <div className="hwp-sidebar-footer">
          <a href="#" 
          onClick={handleLogout}
          className="hwp-nav-item hwp-logout-btn">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </a>
        </div>
      </div>

      {/* --- NỘI DUNG CHÍNH BÊN PHẢI --- */}
      <div className="hwp-main">
        {/* Header của nội dung chính */}
        <header className="hwp-main-header">
          <h1 className="text-xl font-semibold">
            Bảng điều khiển  {hospitalName}
          </h1>
          <div className="hwp-header-actions">
            <button className="hwp-action-btn">
              <Mail size={20} />
            </button>
            <button className="hwp-action-btn">
              <Bell size={20} />
            </button>
            <div className="hwp-action-btn hwp-user-avatar-btn">{hospitalInitials} </div>
          </div>
        </header>

        {/* Vùng nội dung được render động */}
        <main className="hwp-main-content">{renderMainContent()}</main>
      </div>
    </div>
  );
};

// 4. Export với tên component mới
export default HospitalWorkspacePage;