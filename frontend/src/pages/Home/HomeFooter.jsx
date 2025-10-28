import React from "react";
// Có thể cần thêm icon từ các thư viện như react-icons nếu bạn không dùng SVG/Ảnh
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaTiktok } from 'react-icons/fa'; 
import "../../assets/Home/HomeFooter.css"; // Import file CSS

const HomeFooter = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Cột 1: Thông tin Công ty và Kết nối */}
        <div className="footer-col company-info-col">
          <div className="company-details">
            <h4 className="col-title">CÔNG TY TNHH YOUMED VIỆT NAM</h4>
            <p className="detail-row">
              <span className="detail-label">VPĐD:</span> 3/1 Thành Thái, Phường Diên Hồng, TP. HCM
            </p>
            <p className="detail-row">
              <span className="detail-label">Hotline:</span> 1900-2805 (8:00 - 17:30 T2 đến T7)
            </p>
            <p className="detail-license">
              Số ĐKKD 0315266642 do Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh cấp lần đầu ngày 14/09/2018.
            </p>
          </div>
          
          <div className="social-connect">
            <h4 className="col-title">Kết nối với chúng tôi</h4>
            <div className="social-icons">
              <a href="https://facebook.com" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://zalo.me" aria-label="Zalo"><img src="https://cdn.youmed.vn/wp-content/themes/youmed/images/zalo.svg" width="36" height="16" alt="Zalo" className="zalo-icon"/></a> {/* Dùng ảnh nếu không có icon thư viện */}
              <a href="https://youtube.com" aria-label="Youtube"><FaYoutube /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://tiktok.com" aria-label="Tiktok"><FaTiktok /></a>
            </div>
          </div>
        </div>

        {/* Cột 2: Về YouMed */}
        <div className="footer-col">
          <h4 className="col-title">Về YouMed</h4>
          <a href="#gioi-thieu" className="footer-link">Giới thiệu về YouMed</a>
          <a href="#ban-dieu-hanh" className="footer-link">Ban điều hành</a>
          <a href="#tuyen-dung" className="footer-link">Nhân sự & Tuyển dụng</a>
          <a href="#lien-he" className="footer-link">Liên hệ</a>
        </div>

        {/* Cột 3: Dịch vụ */}
        <div className="footer-col">
          <h4 className="col-title">Dịch vụ</h4>
          <a href="#dat-bac-si" className="footer-link">Đặt khám Bác sĩ</a>
          <a href="#dat-benh-vien" className="footer-link">Đặt khám Bệnh viện</a>
          <a href="#dat-phong-kham" className="footer-link">Đặt khám Phòng Khám</a>
          <a href="#y360" className="footer-link">Y360</a>
        </div>

        {/* Cột 4: Hỗ trợ */}
        <div className="footer-col support-col">
          <h4 className="col-title">Hỗ trợ</h4>
          <a href="#dieu-khoan" className="footer-link">Điều Khoản Sử Dụng</a>
          <a href="#chinh-sach" className="footer-link">Chính sách Bảo Mật</a>
          <a href="#giai-quyet" className="footer-link">Chính sách giải quyết khiếu nại</a>
          <p className="footer-link">Hỗ trợ khách hàng: cskh@youmed.vn</p>
          
          {/* Logo chứng nhận */}
          <div className="certification-logos">
              {/* Thay thế bằng ảnh chứng nhận thực tế */}
              <img src="https://cdn.youmed.vn/wp-content/themes/youmed/images/dadangky.svg" alt="Chứng nhận" />
              <img src="https://images.dmca.com/Badges/dmca-badge-w250-2x1-04.png?ID=a74b3497-ddcd-4860-89c3-fce83c39f12a" alt="Chứng nhận Bộ Công Thương" />
          </div>
        </div>
        
      </div>

      {/* Phần Copyright và Disclaimer */}
      <div className="footer-bottom">
        <hr className="footer-divider" />
        <p className="disclaimer-text">
          Các thông tin trên YouMed chỉ dành cho mục đích tham khảo, tra cứu và không thay thế cho việc chẩn đoán, điều trị y khoa.
          Cần tuyệt đối tuân theo hướng dẫn của Bác sĩ và Nhân viên y tế.
        </p>
        <p className="copyright-text">
          Copyright © 2018 - 2025 Công ty TNHH YouMed Việt Nam.
        </p>
      </div>
    </footer>
  );
};

export default HomeFooter;