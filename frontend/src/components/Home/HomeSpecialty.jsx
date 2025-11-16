import React, { useState } from "react";
import "../../assets/Home/HomeSpecialty.css";

const specialtyData = [
  { id: 1, name: "Y học cổ truyền", icon: "/images/specialty/Yhoccotruyen.png" },
  { id: 2, name: "Truyền nhiễm", icon: "/images/specialty/Truyennhiem.png" },
  { id: 3, name: "Tim mạch", icon: "/images/specialty/Timmach.png" },
  { id: 4, name: "Lão khoa", icon: "/images/specialty/Laokhoa.png" },
  { id: 5, name: "Chấn thương chỉnh hình", icon: "/images/specialty/Chanthuongchinhhinh.png" },
  { id: 6, name: "Hồi sức - cấp cứu", icon: "/images/specialty/Hoisuccapcuu.png" },

  { id: 7, name: "Ngoại tổng quát", icon: "/images/specialty/Ngoaitongquat.png" },
  { id: 8, name: "Gây mê hồi sức", icon: "/images/specialty/Gaymehoisuc.png" },
  { id: 9, name: "Tai - Mũi - Họng", icon: "/images/specialty/Taimuihong.png" },
  { id: 10, name: "Thần kinh", icon: "/images/specialty/Thankinh.png" },
  { id: 11, name: "Nội thận", icon: "/images/specialty/Noithan.png" },
  { id: 12, name: "Nhi khoa", icon: "/images/specialty/Nhikhoa.png" },

  { id: 13, name: "Hô hấp", icon: "/images/specialty/Hohap.png" },
  { id: 14, name: "Xét nghiệm", icon: "/images/specialty/Xetnghiem.png" },
  { id: 15, name: "Huyết học", icon: "/images/specialty/Huyethoc.png" },
  { id: 16, name: "Đa khoa", icon: "/images/specialty/Dakhoa.png" },
  { id: 17, name: "Ung bứu", icon: "/images/specialty/Ungbuu.png" },
  { id: 18, name: "Lao - Bệnh phổi", icon: "/images/specialty/Laobenhphoi.png" },

  { id: 19, name: "Cơ xương khớp", icon: "/images/specialty/Coxuongkhop.png" },
  { id: 20, name: "Sản phụ khoa", icon: "/images/specialty/Sanphukhoa.png" },
  { id: 21, name: "Nhãn khoa", icon: "/images/specialty/Nhankhoa.png" },
  { id: 22, name: "Răng - hàm - mặt", icon: "/images/specialty/Ranghammat.png" },
  { id: 23, name: "Da liễu", icon: "/images/specialty/Dalieu.png" },
  { id: 24, name: "Chuẩn đoán hình ảnh", icon: "/images/specialty/Chuandoanhinhanh.png" },
];

const HomeSpecialty = ({ isBookingPage = false }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleSpecialties = showAll ? specialtyData : specialtyData.slice(0, 6);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="home-specialty">
      <div className="container">
        {!isBookingPage ? (
          <div className="specialty-header">
            <h2 className="title">Đặt lịch theo Chuyên khoa</h2>
            <p className="subtitle">
              Danh sách bác sĩ, bệnh viện, phòng khám theo chuyên khoa
            </p>
          </div>
        ) : (
          <div className="text-center mb-[24px]">
            <h2 className="font-[700] text-[30px] ">Đa dạng chuyên khoa khám</h2>
            <p className="subtitle">
              Đặt khám dễ dàng và tiện lợi hơn với đầy đủ các chuyên khoa
            </p>
          </div>
        )}

        {/* Danh sách chuyên khoa */}
        <div className={`specialty-list ${showAll ? "expanded" : ""}`}>
          {visibleSpecialties.map((item) => (
            <div className="specialty-card" key={item.id}>
              <img src={item.icon} alt={item.name} className="specialty-icon" />
              <p>{item.name}</p>
            </div>
          ))}
        </div>

        {/* Nút xem thêm / thu gọn */}
        <div className="view-more">
          <button className="btn-view-more" onClick={handleToggle}>
            {showAll ? "Thu gọn" : "Xem thêm"}
            <span className="arrow-icon">
              <div className="icon-default">
                <i
                  className={`fa-solid fa-chevron-${showAll ? "up" : "down"}`}
                ></i>
              </div>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeSpecialty;