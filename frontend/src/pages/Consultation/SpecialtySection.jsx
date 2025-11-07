import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../../assets/Home/OnlineConsultation.css";

const specialties = [
    { name: "Tổng quát", img: "https://cdn.youmed.vn/wp-content/uploads/2022/03/polyclinic.svg" },
    { name: "Nhi khoa", img: "https://cdn.youmed.vn/wp-content/uploads/2022/03/pediatrics.svg" },
    { name: "Sản phụ khoa", img: "https://cdn.youmed.vn/wp-content/uploads/2022/03/obstetrics.svg" },
    { name: "Tâm lý", img: "https://cdn.youmed.vn/wp-content/uploads/2022/03/psychiatric.svg" },
    { name: "Da liễu", img: "https://cdn.youmed.vn/wp-content/uploads/2022/03/dermatology.svg" },
    { name: "Răng - Hàm - Mặt", img: "https://cdn.youmed.vn/wp-content/uploads/2022/03/dental.svg" },
    { name: "Tai - Mũi - Họng", img: "https://cdn.youmed.vn/wp-content/uploads/2022/03/otorhinolaryngology.svg" },
    { name: "Thần kinh", img: "https://cdn.youmed.vn/wp-content/uploads/2022/03/neurology.svg" },
    { name: "Hô hấp", img: "https://cdn.youmed.vn/wp-content/uploads/2022/04/breath.svg" },
    { name: "Tiêu hóa", img: "https://cdn.youmed.vn/wp-content/uploads/2022/03/gastroenterology.svg" },
];

const SpecialtySection = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <section className="specialty-section">
            <div className="specialty-header">
                <h2>Hơn 20 chuyên khoa tư vấn</h2>
                <p>
                    Kết nối với các bác sĩ đầu ngành trong các chuyên khoa dễ dàng và tiện lợi
                </p>
            </div>

            <div
                className={`specialty-grid-wrapper ${showMore ? "expanded" : ""}`}
            >
                <div className="specialty-grid">
                    {specialties.map((item, i) => (
                        <div key={i} className="specialty-item">
                            <div className="specialty-icon">
                                <img src={item.img} alt={item.name} />
                            </div>
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="toggle-button"
                onClick={() => setShowMore(!showMore)}
            >
                {showMore ? (
                    <>
                        <FaChevronUp /> Thu gọn
                    </>
                ) : (
                    <>
                        <FaChevronDown /> Xem thêm
                    </>
                )}
            </button>
        </section>
    );
};

export default SpecialtySection;