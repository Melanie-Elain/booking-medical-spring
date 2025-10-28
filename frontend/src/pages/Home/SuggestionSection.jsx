import React from "react";
import "../../assets/Home/SuggestionSection.css";

const SuggestionSection = () => {
  return (
    <section className="suggestion-section">
      {/* Phần đội ngũ chuyên gia */}
      <div className="expert-team">
        <h2>Đội ngũ chuyên gia</h2>
        <div className="expert-box">
          <div className="expert-list">
            <div className="expert-item">
              <img src="https://cdn-icons-png.flaticon.com/512/706/706830.png" alt="Nguyễn Hồng Vân Khánh" />
              <div>
                <h4>ThS.BS Nguyễn Hồng Vân Khánh</h4>
                <p>Gan mật tuỵ - Ghép gan, Nhi</p>
              </div>
            </div>
            <div className="expert-item">
              <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" alt="Đinh Thị Lan Phương" />
              <div>
                <h4>ThS.BS Đinh Thị Lan Phương</h4>
                <p>Tai - Mũi - Họng</p>
              </div>
            </div>
            <div className="expert-item">
              <img src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png" alt="Nguyễn Văn A" />
              <div>
                <h4>ThS.BS Vũ Thành Đô</h4>
                <p>Tim - Thận - Khớp - Nội tiết</p>
              </div>
            </div>
            <div className="expert-item">
              <img src="https://cdn-icons-png.flaticon.com/512/4140/4140061.png" alt="Nguyễn Văn A" />
              <div>
                <h4>ThS.BS Phan Lê Nam</h4>
                <p>Sản phụ khoa</p>
              </div>
            </div>
            <div className="expert-item">
              <img src="https://cdn-icons-png.flaticon.com/512/706/706830.png" alt="Nguyễn Văn A" />
              <div>
                <h4> Dược sĩ Dương Anh Hoàng</h4>
                <p>Dược</p>
              </div>
            </div>
            <div className="expert-item">
              <img src="https://cdn-icons-png.flaticon.com/512/4140/4140038.png" alt="Nguyễn Văn A" />
              <div>
                <h4>ThS.BS Nguyễn Trung Nghĩa</h4>
                <p>Tâm thần</p>
              </div>
            </div>

          </div>

          <div className="expert-desc">
            <p>
              Hội đồng tham vấn y khoa cùng đội ngũ biên tập viên là các bác sĩ,
              dược sĩ đảm bảo nội dung chính xác và cập nhật thông tin y khoa mới nhất.
            </p>
            <button className="btn-view-team">Đội ngũ chuyên gia →</button>
          </div>
        </div>
      </div>

      {/* Phần gợi ý thông tin */}
      <div className="info-suggestion">
        <div className="info-content-wrapper">
        <h3 className="info-title-left">
          Tạo nên một nguồn thông tin sức khỏe đáng tin cậy, dễ đọc,
          dễ hiểu cho mọi đối tượng độc giả
        </h3>

        <div className="info-policies">
          <div className="policy-item">
            <img src="https://cdn.youmed.vn/wp-content/themes/youmed/images/promis.svg" alt="" />
            <p>Biên soạn bởi<br/>Bác sĩ và Dược sĩ</p>
          </div>
          <div className="policy-item">
            <img src="https://cdn.youmed.vn/wp-content/themes/youmed/images/promis-2.svg" alt="" />
            <p>Chính sách biên tập<br/>nội dung minh bạch</p>
          </div>
          <div className="policy-item">
            <img src="https://cdn.youmed.vn/wp-content/themes/youmed/images/promis-3.svg" alt="" />
            <p>Chính sách <br /> quảng cáo</p>
          </div>
          <div className="policy-item">
            <img src="https://cdn.youmed.vn/wp-content/themes/youmed/images/promis-4.svg" alt="" />
            <p>Chính sách <br />bảo mật</p>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
};

export default SuggestionSection;
