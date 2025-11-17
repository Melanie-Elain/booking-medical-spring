import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 1. XÓA import CSS
// import "../../assets/Home/DocterWorkspace.css"; 
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  BarChart3,
  ChevronDown,
  Bell,
  Mail,
  LogOut,
  CalendarClock,
  Users,
} from "lucide-react";
import { getCurrentUser } from "../../api/auth";

// --- COMPONENT CON CHO CÁC MỤC (DÙNG TAILWIND) ---
const OverviewDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Báo cáo tổng quan</h2>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button className="py-2 px-4 text-blue-600 border-b-2 border-blue-600 font-semibold text-sm">
          Hôm nay
        </button>
        <button className="py-2 px-4 text-gray-500 hover:text-blue-600 text-sm">
          7 ngày qua
        </button>
        <button className="py-2 px-4 text-gray-500 hover:text-blue-600 text-sm">
          30 ngày qua
        </button>
      </div>

      {/* 4 Thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">TỔNG DOANH THU</h3>
          <p className="text-3xl font-bold text-gray-800">0</p>
          <p className="text-sm text-gray-400">Lượt khám: 0</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <h3 className="text-sm font-medium text-gray-500">PHÒNG KHÁM</h3>
          <p className="text-3xl font-bold text-gray-800">0</p>
          <p className="text-sm text-gray-400">Ký trước: 0</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">DỊCH VỤ TRỰC TUYẾN</h3>
          <p className="text-3xl font-bold text-gray-800">0</p>
          <p className="text-sm text-gray-400">Cuộc gọi: 0 | Tin nhắn: 0</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">DOANH THU DỊCH VỤ</h3>
          <p className="text-3xl font-bold text-gray-800">0</p>
          <p className="text-sm text-gray-400">Đơn thuốc: 0 | Chỉ định: 0</p>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow h-64">
          <h3 className="font-semibold text-gray-700">Lượt bệnh nhân đến khám</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow h-64">
          <h3 className="font-semibold text-gray-700">Tỉ lệ khách mới/cũ</h3>
        </div>
      </div>
    </div>
  );
};

const AppointmentManagement = () => ( <div><h2 className="text-2xl font-bold mb-4 text-gray-800">Quản lý Lịch khám</h2><div className="bg-white p-4 rounded-lg shadow"><p>Nội dung quản lý lịch khám...</p></div></div> );
const DoctorProfileManagement = () => ( <div><h2 className="text-2xl font-bold mb-4 text-gray-800">Hồ sơ Bác sĩ</h2><div className="bg-white p-4 rounded-lg shadow"><p>Nội dung hồ sơ bác sĩ...</p></div></div> );
const ScheduleManagement = () => ( <div><h2 className="text-2xl font-bold mb-4 text-gray-800">Quản lý Lịch làm việc</h2><div className="bg-white p-4 rounded-lg shadow"><p>Nội dung lịch làm việc...</p></div></div> );


// --- COMPONENT CHÍNH (LAYOUT) ---
const DoctorWorkspacePage = () => {
  const [activeView, setActiveView] = useState("tongquan");
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const role = localStorage.getItem("userRole");

    if (!token || (role !== "BACSI" && role !== "ADMIN")) {
      navigate("/doctor-login", { replace: true });
    } else {
      const fetchDoctorData = async () => {
        try {
          const data = await getCurrentUser();
          setDoctorInfo(data);
        } catch (error) {
          console.error("Không thể lấy thông tin bác sĩ:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDoctorData();
    }
  }, [navigate]);

  const renderMainContent = () => {
    switch (activeView) {
      case "tongquan": return <OverviewDashboard />;
      case "lichkham": return <AppointmentManagement />;
      case "lichlamviec": return <ScheduleManagement />;
      case "hosobacsi": return <DoctorProfileManagement />;
      default: return <OverviewDashboard />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    window.dispatchEvent(new Event("authChange"));
    navigate("/doctor-login", { replace: true });
  };

  if (isLoading) {
    return ( <div className="flex justify-center items-center min-h-screen">Đang tải...</div> );
  }

  const doctorName = doctorInfo ? doctorInfo.fullName : "Bác sĩ";
  const doctorPhone = doctorInfo ? doctorInfo.phoneNumber : "...";
  const doctorAvatar = doctorInfo ? doctorInfo.fullName.split(" ").pop().charAt(0) : "B";

  // 2. THAY THẾ HOÀN TOÀN BẰNG TAILWIND (Theme Sáng)
  return (
    <div className="flex min-h-screen">
      {/* --- SIDEBAR BÊN TRÁI (Theme Sáng) --- */}
      <div className="w-64 bg-white shadow-md flex flex-col flex-shrink-0">
        {/* Logo/User Info */}
          <div className="flex items-center p-4 border-b border-gray-200">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">
            {doctorAvatar}
          </div>
          <div className="flex-grow min-w-0"> 
            <span className="text-sm font-semibold text-gray-900 block truncate">
              {doctorName}
            </span>
            <span className="text-xs text-gray-500 block truncate">
              {doctorPhone}
            </span>
          </div>
          <ChevronDown size={18} className="ml-2 text-gray-400 flex-shrink-0" />
        </div>

        {/* Menu chính */}
        <nav className="flex-grow p-2">
          <a
            href="#"
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeView === "tongquan"
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
            onClick={() => setActiveView("tongquan")}
          >
            <LayoutDashboard size={20} className="mr-3" />
            <span className="font-medium">Tổng quan</span>
          </a>

          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase">
            Phòng khám
          </p>
          <a
            href="#"
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeView === "lichkham"
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
            onClick={() => setActiveView("lichkham")}
          >
            <CalendarCheck size={20} className="mr-3" />
            <span className="font-medium">Quản lý Lịch khám</span>
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeView === "hosobenhnhan"
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
            onClick={() => setActiveView("hosobenhnhan")}
          >
            <Users size={20} className="mr-3" />
            <span className="font-medium">Hồ sơ Bệnh nhân</span>
          </a>

          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase">
            Đặt khám thông minh
          </p>
          <a
            href="#"
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeView === "lichlamviec"
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
            onClick={() => setActiveView("lichlamviec")}
          >
            <CalendarClock size={20} className="mr-3" />
            <span className="font-medium">Lịch làm việc</span>
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeView === "hosobacsi"
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
            onClick={() => setActiveView("hosobacsi")}
          >
            <User size={20} className="mr-3" />
            <span className="font-medium">Hồ sơ Bác sĩ</span>
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeView === "thongke"
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
            onClick={() => setActiveView("thongke")}
          >
            <BarChart3 size={20} className="mr-3" />
            <span className="font-medium">Thống kê</span>
          </a>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-2 border-t border-gray-200">
          <a
            href="#"
            onClick={handleLogout}
            className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Đăng xuất</span>
          </a>
        </div>
      </div>

      {/* --- NỘI DUNG CHÍNH BÊN PHẢI --- */}
      <div className="flex-grow flex flex-col bg-gray-100">
        {/* Header của nội dung chính */}
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">
            Chào mừng, Bác sĩ {doctorName}!
          </h1>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
              <Mail size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              {doctorAvatar}
            </div>
          </div>
        </header>

        {/* Vùng nội dung được render động */}
        <main className="p-6 flex-grow">{renderMainContent()}</main>
      </div>
    </div>
  );
};

export default DoctorWorkspacePage;