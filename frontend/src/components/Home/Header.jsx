import React from 'react';
import { IoLogInOutline } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
import '../../assets/Home/Header.css';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // 1. Kiểm tra trạng thái đăng nhập từ localStorage
  const token = localStorage.getItem('jwtToken');
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');
  const isLoggedIn = !!token; 

  // 2. Hàm Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('rememberedPhone');
    window.location.href = '/'; // Tải lại trang
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="/" className="logo-link">
            <img
              src="https://cdn.youmed.vn/wp-content/themes/youmed/images/logo.svg"
              alt="YouMed Logo"
              className="logo-img"
            />
          </a>
        </div>

        <nav className="nav-menu">
          {/* Menu "Đặt khám" */}
          <div className="nav-item dropdown">
            <button className="dropdown-label">Đặt khám <span className="caret">▾</span></button>
            <div className="dropdown-panel">
              <div className="dropdown-inner">
                <a href="" className="dropdown-row" onClick={() => navigate('/dat-kham/bac-si')}>
                  <div className="row-title">Đặt khám bác sĩ</div>
                  <div className="row-desc">Đặt lịch khám không chờ đợi</div>
                </a>
                <a href="" className="dropdown-row" onClick={() => navigate('/dat-kham/benh-vien')}>
                  <div className="row-title">Đặt khám bệnh viện</div>
                  <div className="row-desc">Đặt khám, thanh toán, nhận kết quả</div>
                </a>
                <a href="" className="dropdown-row" onClick={() => navigate('/dat-kham/phong-kham')}>
                  <div className="row-title">Đặt khám phòng khám</div>
                  <div className="row-desc">Đa dạng chuyên khoa và dịch vụ</div>
                </a>


                <a href="" className="dropdown-row"
                  onClick={() => navigate('/dat-kham/tiem-chung')}
                >
                  <div className="row-title">Đặt lịch tiêm chủng</div>
                  <div className="row-desc">Trung tâm tiêm chủng uy tín</div>
                </a>

                <a href="" className="dropdown-row"
                  onClick={() => navigate('/dat-kham/xet-nghiem')}
                >

                  <div className="row-title">Đặt lịch xét nghiệm</div>
                  <div className="row-desc">Trung tâm xét nghiệm uy tín</div>
                </a>
                <div className="dropdown-footer">
                  Bạn cần hỗ trợ? Gọi cho chúng tôi 1900-2805
                </div>
              </div>
            </div>
          </div>

          {/* Chuyển đổi sang tư vấn trực tuyến */}
          <a href="" className="nav-item"
            onClick={(e) => {
              e.preventDefault();
              navigate("/tu-van-truc-tuyen");
            }}
          >Tư vấn trực tuyến</a>

          {/* Chuyển đổi sang tin y tế */}
          <a href="" className="nav-item"
            onClick={(e) => {
              e.preventDefault();
              navigate("/tin-y-te");
            }}
          >Tin Y tế</a>

          <a href="#tro-ly" className="nav-item">Trợ lý y khoa</a>
          <a href="#danh-cho-bs" className="nav-item">Dành cho Bác sĩ</a>

          {/* === LOGIC HIỂN THỊ ĐỘNG === */}
          {isLoggedIn ? (
            // ===== NẾU ĐÃ ĐĂNG NHẬP =====
            <div className="nav-item dropdown">
              <button className="dropdown-label user-dropdown-toggle">
                <FaRegUserCircle size={20} />
                <span>{userName || 'Tài khoản'}</span>
                <span className="caret">▾</span>
              </button>
              
              {/* Menu dropdown  */}
              <div className="dropdown-panel user-dropdown-menu">
                <div className="dropdown-inner">
                  <Link to="/user/appointments" className="dropdown-row">
                    <div className="row-title">Lịch khám</div>
                  </Link>
                  <Link to="/user/payment-history" className="dropdown-row">
                    <div className="row-title">Lịch sử thanh toán</div>
                  </Link>
                  <Link to="/user/profile" className="dropdown-row">
                    <div className="row-title">Hồ sơ</div>
                  </Link>
                  <div className="dropdown-divider"></div> 
                  <button onClick={handleLogout} className="dropdown-row logout-btn">
                    <div className="row-title">Thoát</div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // ===== NẾU CHƯA ĐĂNG NHẬP =====
            <Link to="/login" className="nav-item login-btn">
              <IoLogInOutline size={18} /> Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;