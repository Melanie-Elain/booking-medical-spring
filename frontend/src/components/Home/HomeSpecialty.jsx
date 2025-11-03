import React from "react";
import "../../assets/Home/HomeSpecialty.css";

const specialtyData = [
  { id: 1, name: "Y học cổ truyền", icon: "/images/Yhoccotruyen.png" },
  { id: 2, name: "Truyền nhiễm", icon: "/images/Truyennhiem.png" },
  { id: 3, name: "Tim mạch", icon: "/images/Timmach.png" },
  { id: 4, name: "Lão khoa", icon: "/images/Laokhoa.png" },
  { id: 5, name: "Chấn thương chỉnh hình", icon: "/images/Chanthuongchinhhinh.png" },
  { id: 6, name: "Hồi sức - cấp cứu", icon: "/images/Hoisuccapcuu.png" },
];

const HomeSpecialty = () => {
  return (
    <section className="home-specialty">
      <div className="container">
        <div className="specialty-header">
          <h2 className="title">Đặt lịch theo Chuyên khoa</h2>
          <p className="subtitle">
            Danh sách bác sĩ, bệnh viện, phòng khám theo chuyên khoa
          </p>
        </div>

        <div className="specialty-list">
          {specialtyData.map((item) => (
            <div className="specialty-card" key={item.id}>
              <img src={item.icon} alt={item.name} className="specialty-icon" />
              <p>{item.name}</p>
            </div>
          ))}
        </div>

        <div className="view-more">
          <button className="btn-view-more">Xem thêm<span className="arrow-icon">
            <div className="icon-default"><i class="fa-solid fa-chevron-right"></i></div>
          </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeSpecialty;
