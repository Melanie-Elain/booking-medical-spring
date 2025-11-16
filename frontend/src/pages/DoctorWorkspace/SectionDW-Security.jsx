import React from "react";
import "../../assets/Home/DocterWorkspace.css";

const SecuritySection = () => {
  const dataSectionDW_Security = [
    {
      icon: "/images/IntroDW/security1.png",
      title: "Mã hóa và lưu trữ an toàn",
      description:
        "Dữ liệu được mã hóa AES-256 và lưu trữ trên hạ tầng đáp ứng các tiêu chuẩn quốc tế như ISO 27001, Uptime Tier 3.",
    },
    {
      icon: "/images/IntroDW/security2.png",
      title: "Kiểm soát quyền truy cập",
      description:
        "Gán quyền theo vai trò linh hoạt và bảo mật. Hỗ trợ đăng nhập hai lớp (MFA) và theo dõi lịch sử truy cập.",
    },
    {
      icon: "/images/IntroDW/security3.png",
      title: "Tuân thủ quy định về quyền riêng tư",
      description:
        "Tuân thủ các tiêu chuẩn và quy định: 13/2023/NĐ-CP, HIPPA. Luôn có quy trình kiểm tra bảo mật định kỳ hằng năm.",
    },
  ];

  return (
    <section className="security-section">
      <div className="security-header">
        <h2>An toàn và Bảo mật</h2>
        <p>
          Bảo mật thông tin y tế là nền tảng cốt lõi. Chúng tôi xây dựng một
          hạ tầng số hiện đại, tuân thủ nghiêm ngặt các tiêu chuẩn quốc tế về
          lưu trữ và xử lý dữ liệu.
        </p>
      </div>
      <div className="security-cards">
        {dataSectionDW_Security.map((dataSectionDW_Security, index) => (
          <div key={index} className="security-card">
            <div className="icon-wrapper">
              <img src={dataSectionDW_Security.icon} alt={dataSectionDW_Security.title} />
            </div>
            <h3>{dataSectionDW_Security.title}</h3>
            <p>{dataSectionDW_Security.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecuritySection;