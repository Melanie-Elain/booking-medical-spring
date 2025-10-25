import React from "react";
import './HomeClinic.css';

const clinicData = [
    { 
        id: 1, 
        logo: 'logo-cao-thang.png', 
        title: 'Phòng khám Sản Phụ Khoa 13 Cao Thắng', 
        address: '13 Cao Thắng, Phường Bến Nghé, Q.1, TP.HCM' 
    },
    { 
        id: 2, 
        logo: 'logo-my-my.png', 
        title: 'Phòng khám Nhi Mỹ Mỹ', 
        address: '105/10 Nguyễn Thị Tú, P. Bình Hưng Hòa B, Q. Bình Tân, TP.HCM' 
    },
    { 
        id: 3, 
        logo: 'logo-chac.png', 
        title: 'Trung Tâm Chăm Sóc Sức Khỏe Cộng Đồng - CHAC', 
        address: '110A Ngô Quyền, P.5, Q.10, TP.HCM' 
    },
    { 
        id: 4, 
        logo: 'logo-shine.png', 
        title: 'Shine Clinic By TS.BS Trần Ngọc Ánh since 1987', 
        address: '06 Trương Quyền, P.6, Q.3, TP.HCM' 
    },
];

const ClinicCard = ({ logo, title, address }) => (
    <div className="clinic-card">
        <div className="logo-container">
            {/* Giả định bạn đã có thư mục 'assets/logos' chứa ảnh */}
            <img src={`/images/${logo}`} alt={title} className="clinic-logo" /> 
        </div>
        <div className="clinic-info">
            <p className="clinic-card-title">{title}</p>
            <p className="clinic-card-address">{address}</p>
        </div>
    </div>
);

const HomeClinic = () => {
    return (
        <section className="home-clinic">
            <div className="container">
                {/*Header & Btn_viewAll*/}
                <div className="clinic-header">
                    <div className="clinic-text">
                        <h2 className="title">Đặt khám phòng khám</h2>
                        <p className="subtitle">
                            Đa dạng phòng khám với nhiều chuyên khoa khác nhau như Sản - Nhi, Tai Mũi họng, Da Liễu, Tiêu Hoá...
                        </p>
                    </div>
                    <button className="view-all-btn">
                        Xem thêm <span className="arrow-icon"><i class="fa-solid fa-chevron-right"></i></span>
                    </button>
                </div>
                {/*Clinic list*/}
                <div className="clinic-list">
                    {clinicData.map(clinic => (
                        <ClinicCard
                            key={clinic.id}
                            logo={clinic.logo}
                            title={clinic.title}
                            address={clinic.address}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeClinic;