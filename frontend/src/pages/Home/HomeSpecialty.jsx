import React from "react";

const specialties = [
  { id: 1, name: "Tim mạch", image: "/assets/timmach.jpg" },
  { id: 2, name: "Da liễu", image: "/assets/dalieu.jpg" },
  { id: 3, name: "Nhi khoa", image: "/assets/nhikhoa.jpg" },
  { id: 4, name: "Tai mũi họng", image: "/assets/taimuihong.jpg" },
];

const HomeSpecialty = () => {
  return (
    <section className="specialty-section">
      <h2>Chuyên khoa nổi bật</h2>
      <div className="specialty-list">
        {specialties.map((s) => (
          <div className="specialty-item" key={s.id}>
            <img src={s.image} alt={s.name} />
            <p>{s.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeSpecialty;
