import React from "react";
import '../../assets/Home/HomeDoctor.css';


const HomeDoctor = () => {
  return (
    <section className="home-doctor">
      <div className="container">
        <h2 className="title">Đội ngũ bác sĩ hàng đầu</h2>
        <p className="subtitle">
          Kết nối bạn với các chuyên gia y tế uy tín trên toàn quốc.
        </p>

        <div className="doctor-list">
          <div className="doctor-card">
            <img
              src="/images/doctor1.jpg"
              alt="Bác sĩ 1"
              className="doctor-image"
            />
            <h3>BS. Nguyễn Văn A</h3>
            <p>Chuyên khoa Nội tổng hợp</p>
          </div>

          <div className="doctor-card">
            <img
              src="/images/doctor2.jpg"
              alt="Bác sĩ 2"
              className="doctor-image"
            />
            <h3>BS. Trần Thị B</h3>
            <p>Chuyên khoa Nhi</p>
          </div>

          <div className="doctor-card">
            <img
              src="/images/doctor3.jpg"
              alt="Bác sĩ 3"
              className="doctor-image"
            />
            <h3>BS. Lê Văn C</h3>
            <p>Chuyên khoa Tai Mũi Họng</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDoctor;
