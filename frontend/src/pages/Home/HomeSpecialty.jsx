import React from "react";
import './HomeSpecialty.css';

const specialtyData = [
  { id: 1, name: "Tim mạch", image: "timmach.jpg" },
  { id: 2, name: "Da liễu", image: "dalieu.jpg" },
  { id: 3, name: "Nhi khoa", image: "nhikhoa.jpg" },
  { id: 4, name: "Tai mũi họng", image: "taimuihong.jpg" },
];

const SpecialtyCard = ({ image, name }) => (
  <div className="specialty-card">
    <div className="image-container">
      {/* Giả định bạn đã có thư mục 'assets/images' chứa ảnh */}
      <img src={`/assets/images/${image}`} alt={name} className="specialty-image" />
    </div>
    <div className="specialty-info">
      <p className="specialty-card-name">{name}</p>
    </div>
  </div>
);

const HomeSpecialty = () => {
  return (
    <section className="home-specialty">
      <div className="container">
        <div className="specialty-header">
          <div className="specialty-text">
            <h2 className="title">Đặt lịch theo Chuyên khoa</h2>
            <p className="subtitle">
              Danh sách bác sĩ, bệnh viện, phòng khám theo chuyên khoa
            </p>
          </div>
        </div>
        <div className="specialty-list">
          {specialtyData.map(specialty => (
            <SpecialtyCard
              key={specialty.id}
              image={specialty.image}
              name={specialty.name}
            />
          ))}
        </div>
        <div className="specialty-footer">
          <button className="view-all-btn">
            Xem thêm <span className="arrow-icon"><i class="fa-solid fa-chevron-right"></i></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeSpecialty;
