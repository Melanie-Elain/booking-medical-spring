
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import "../../assets/Home/HomeBanner.css";

const HomeBanner = () => {
  const location = useLocation();
  const isConsultationPage = location.pathname.includes("/tu-van-truc-tuyen");
  const isMedicalNewsPage = location.pathname.includes("/tin-y-te");

  if (isConsultationPage) {
    // Consultation Banner dành riêng cho Tư vấn trực tuyến
    return (
      <section className="home-banner consultation-banner">
        <div className="banner-content">
          <h1>Tư vấn trực tuyến cùng bác sĩ Chọn YouMed ngay!</h1>
          <p>
            Kết nối nhanh chóng với đội ngũ bác sĩ uy tín <br />
            qua video call – bảo mật và tiện lợi, mọi lúc mọi nơi.
          </p>
          <a
            href="https://youmed.vn/download"
            target="_blank"
            rel="noopener noreferrer"
            className="consultation-download-btn"
          >
            Tải ứng dụng ngay
          </a>
        </div>

        <div className="banner-image">
          <img
            src="https://cdn.youmed.vn/wp-content/themes/youmed/images/main-tele.svg"
            alt="Tư vấn trực tuyến"
          />
        </div>
      </section>
    );
  }

  // MedicalNews Banner
  if (isMedicalNewsPage) {
    return (
      <section className="home-banner news-banner">
        <div className="banner-content">
          <h1>Tin tức y tế mới nhất</h1>
          <p>
            Cập nhật kiến thức sức khỏe, y học và xu hướng chăm sóc sức khỏe cộng đồng mỗi ngày.
          </p>
        </div>
        <div className="banner-image">
          <img
            src="https://cdn.youmed.vn/wp-content/themes/youmed/images/medical-news.webp"
            alt="Tin y tế YouMed"
          />
        </div>
      </section>
    );
  }

  // Default Banner
  return (
    <div className="home-wrapper">
      <section className="home-banner">
        <div className="banner-content">
          <h1>Ứng dụng đặt khám</h1>
          <p>
            Đặt khám với hơn 1000 bác sĩ, 25 bệnh viện, 100 phòng khám trên YouMed <br />
            để có số thứ tự và khung giờ khám trước.
          </p>
          <div className="search-box">
            <input
              type="text"
              placeholder="Triệu chứng, bác sĩ, bệnh viện..."
            />
            <button className="search-btn">
              <IoSearchOutline size={20} />
            </button>
          </div>
        </div>
        <div className="banner-image">
          <img
            src="https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp"
            alt="YouMed Banner"
          />
        </div>
      </section>
    </div>
  );
};

export default HomeBanner;