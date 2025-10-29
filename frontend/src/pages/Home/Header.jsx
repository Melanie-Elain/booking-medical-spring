import React from "react";
import { IoLogInOutline } from "react-icons/io5";
import "../../assets/Home/Header.css";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'; 

const Header = () => {
  const navigate = useNavigate();
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
          {/* Wrap both label + menu in one .dropdown so hover covers cả vùng */}
          <div className="nav-item dropdown">
            <button className="dropdown-label">Đặt khám <span className="caret">▾</span></button>

            <div className="dropdown-panel">
              <div className="dropdown-inner">
                <a href="#dat-bac-si" className="dropdown-row"
                  onClick={() => navigate('/Booking/BookingDoctor')}
                >
                  <div className="row-title">Đặt khám bác sĩ</div>
                  <div className="row-desc">Đặt lịch khám không chờ đợi</div>
                </a>

                <a href="#dat-benh-vien" className="dropdown-row">
                  <div className="row-title">Đặt khám bệnh viện</div>
                  <div className="row-desc">Đặt khám, thanh toán, nhận kết quả</div>
                </a>

                <a href="#dat-phong-kham" className="dropdown-row">
                  <div className="row-title">Đặt khám phòng khám</div>
                  <div className="row-desc">Đa dạng chuyên khoa và dịch vụ</div>
                </a>

                <a href="#dat-tiem-chung" className="dropdown-row">
                  <div className="row-title">Đặt lịch tiêm chủng</div>
                  <div className="row-desc">Trung tâm tiêm chủng uy tín</div>
                </a>

                <a href="#dat-xet-nghiem" className="dropdown-row">
                  <div className="row-title">Đặt lịch xét nghiệm</div>
                  <div className="row-desc">Trung tâm xét nghiệm uy tín</div>
                </a>

                <div className="dropdown-footer">
                  Bạn cần hỗ trợ? Gọi cho chúng tôi 1900-2805
                </div>
              </div>
            </div>
          </div>

          <a href="#tu-van" className="nav-item">Tư vấn trực tuyến</a>
          <a href="#tin-y-te" className="nav-item">Tin Y tế</a>
          <a href="#tro-ly" className="nav-item">Trợ lý y khoa</a>
          <a href="#danh-cho-bs" className="nav-item">Dành cho Bác sĩ</a>

          <Link to="/login" className="nav-item login-btn">
            <IoLogInOutline size={18} /> Đăng nhập
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

