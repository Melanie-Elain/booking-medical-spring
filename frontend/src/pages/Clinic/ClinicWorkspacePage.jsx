import React, { useState, useEffect } from "react";
import "../../assets/Home/ClinicWorkspace.css";
import { useNavigate } from "react-router-dom";
import ClinicAppointment from "./ClinicAppointmentManagementPage"

// 2. Import icons (giữ nguyên)
import {
    LayoutDashboard,
    CalendarCheck,
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


const ClinicOverview = () => {
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



const DoctorManagement = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Quản lý Bác sĩ</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                <p>Danh sách bác sĩ, thêm/sửa/xóa thông tin bác sĩ...</p>
            </div>
        </div>
    );
};

const SpecialtyManagement = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Quản lý Dịch vụ/Chuyên khoa</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                <p>Danh sách các dịch vụ/chuyên khoa của phòng khám...</p>
            </div>
        </div>
    );
};

const DoctorScheduleMgmt = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Quản lý Lịch làm việc</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                <p>Sắp xếp lịch làm việc cho các bác sĩ...</p>
            </div>
        </div>
    );
};

// --- COMPONENT CHÍNH  ---
const ClinicWorkspacePage = () => {
    const [activeView, setActiveView] = useState("tongquan");
    const navigate = useNavigate();

    const [clinicName, setClinicName] = useState(
         localStorage.getItem("userName") || "Bác sĩ"
      );

      // 2. Lắng nghe sự kiện 'authChange' (bạn đã tạo ở hàm logout)
      //    để cập nhật tên ngay lập tức khi đăng nhập/đăng xuất
      useEffect(() => {
        const handleAuthChange = () => {
          const newName = localStorage.getItem("userName") || "Bác sĩ";
          setClinicName(newName);
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
      const clinicInitials = getInitials(clinicName);
    
  
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

    // Hàm render nội dung (Đã cập nhật)
    const renderMainContent = () => {
        switch (activeView) {
            case "tongquan":
                return <ClinicOverview />;
            case "lichkham":
                return <ClinicAppointment />;
            case "quanlybacsi":
                return <DoctorManagement />;
            case "quanlykhoa":
                return <SpecialtyManagement />;
            case "lichlamviec":
                return <DoctorScheduleMgmt />;
            default:
                return <ClinicOverview />;
        }
    };

    // 3. TẤT CẢ className ĐÃ ĐỔI TỪ "hwp-" SANG "cwp-"
    return (
        <div className="cwp-dashboard">
            {/* --- SIDEBAR BÊN TRÁI --- */}
            <div className="cwp-sidebar">
                {/* Logo/User Info */}
                <div className="cwp-sidebar-header">
                    <div className="cwp-user-avatar">{clinicInitials}</div> {/* Đổi avatar thành Phòng Khám */}
                    <div>
                        <span className="cwp-user-name">{clinicName}</span>
                    </div>
                    <ChevronDown size={18} />
                </div>

                {/* Menu chính */}
                <nav className="cwp-sidebar-nav">
                    <a
                        href="#"
                        className={`cwp-nav-item ${activeView === "tongquan" ? "active" : ""}`}
                        onClick={() => setActiveView("tongquan")}
                    >
                        <LayoutDashboard size={20} />
                        <span>Tổng quan</span>
                    </a>

                    <p className="cwp-nav-group-title">NGHIỆP VỤ</p>
                    <a
                        href="#"
                        className={`cwp-nav-item ${activeView === "lichkham" ? "active" : ""}`}
                        onClick={() => setActiveView("lichkham")}
                    >
                        <CalendarCheck size={20} />
                        <span>Quản lý Lịch khám</span>
                    </a>

                    <p className="cwp-nav-group-title">QUẢN LÝ PHÒNG KHÁM</p>
                    <a
                        href="#"
                        className={`cwp-nav-item ${activeView === "quanlybacsi" ? "active" : ""}`}
                        onClick={() => setActiveView("quanlybacsi")}
                    >
                        <Stethoscope size={20} />
                        <span>Quản lý Bác sĩ</span>
                    </a>
                    <a
                        href="#"
                        className={`cwp-nav-item ${activeView === "quanlykhoa" ? "active" : ""}`}
                        onClick={() => setActiveView("quanlykhoa")}
                    >
                        <Briefcase size={20} />
                        <span>Quản lý Dịch vụ</span>
                    </a>
                    <a
                        href="#"
                        className={`cwp-nav-item ${activeView === "lichlamviec" ? "active" : ""}`}
                        onClick={() => setActiveView("lichlamviec")}
                    >
                        <CalendarClock size={20} />
                        <span>Lịch làm việc</span>
                    </a>

                    <a
                        href="#"
                        className={`cwp-nav-item ${activeView === "thongke" ? "active" : ""}`}
                        onClick={() => setActiveView("thongke")}
                    >
                        <BarChart3 size={20} />
                        <span>Thống kê</span>
                    </a>
                </nav>

                {/* Footer Sidebar */}
                <div className="cwp-sidebar-footer">
                    <a href="#" 
                    onClick={handleLogout}
                     className="cwp-nav-item cwp-logout-btn">
                        <LogOut size={20} />
                        <span>Đăng xuất</span>
                    </a>
                </div>
            </div>

            {/* --- NỘI DUNG CHÍNH BÊN PHẢI --- */}
            <div className="cwp-main">
                {/* Header của nội dung chính */}
                <header className="cwp-main-header">
                    <h1 className="text-xl font-semibold">
                        Bảng điều khiển {clinicName}
                    </h1>
                    <div className="cwp-header-actions">
                        <button className="cwp-action-btn">
                            <Mail size={20} />
                        </button>
                        <button className="cwp-action-btn">
                            <Bell size={20} />
                        </button>
                        <div className="cwp-action-btn cwp-user-avatar-btn">{clinicInitials}</div>
                    </div>
                </header>

                {/* Vùng nội dung được render động */}
                <main className="cwp-main-content">{renderMainContent()}</main>
            </div>
        </div>
    );
};

// 4. Export với tên component mới
export default ClinicWorkspacePage;