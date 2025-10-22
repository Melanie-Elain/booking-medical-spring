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
          <div className=""></div>
        </div>
        <div></div>
        <div></div>
      </div>
      <h2>Đặt lịch theo Chuyên khoa</h2>
      <div className="specialty-list">
        {specialtyData.map(specialty => (
          <SpecialtyCard
            key={specialty.id}
            image={specialty.image}
            name={specialty.name}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeSpecialty;
