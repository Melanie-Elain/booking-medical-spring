
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import "../../assets/Home/HomeBanner.css";

const HomeBanner = () => {
  return (
<<<<<<< HEAD
    <div className="home-wrapper h-fit">
      <Header />
=======
    <div className="home-wrapper">
>>>>>>> main
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