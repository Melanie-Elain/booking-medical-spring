
import React from "react";
import { IoLogInOutline } from "react-icons/io5";
import "../../assets/Home/Header.css";


const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img
            src="https://cdn.youmed.vn/wp-content/themes/youmed/images/logo.svg"
            alt="YouMed Logo"
            className="logo-img"
          />
        </div>
        <nav className="nav-menu">
          <a href="#dat-kham" className="nav-item">Đặt khám</a>
          <a href="#tu-van" className="nav-item">Tư vấn trực tuyến</a>
          <a href="#tim-y-te" className="nav-item">Tìm Y tế</a>
          <a href="#tri-lieu" className="nav-item">Trị liệu y khoa</a>
          <a href="#danh-cho-bs" className="nav-item">Danh cho Bác sĩ</a>
          <a href="#dang-nhap" className="nav-item login-btn">
            <IoLogInOutline size={18} /> Đăng nhập
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
