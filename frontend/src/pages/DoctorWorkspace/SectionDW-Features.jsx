import React from "react";
import "../../assets/Home/DocterWorkspace.css";

const FeaturesSection = () => {
    const featureCards = [
        {
            icon: "/images/IntroDW/feature-icon-1.png",
            title: "Quản lý phòng khám",
            description: "Quản lý hiệu quả hoạt động phòng khám, nghiệp vụ hành chính.",
            type: "normal",
        },
        {
            icon: "/images/IntroDW/feature-icon-2.png",
            title: "Tư vấn trực tuyến",
            description: "Chăm sóc bệnh nhân cũ, tiếp cận tập người dùng mới, tăng thu nhập.",
            type: "normal",
        },
        {
            icon: "/images/IntroDW/feature-icon-3.png",
            title: "Các khóa học CME",
            description: "Cập nhật thông tin mới, nâng cao kiến thức chuyên môn.",
            type: "normal",
        },
        {
            icon: "/images/IntroDW/feature-icon-4.png",
            title: "Phát triển thương hiệu bác sĩ",
            description: "Xây dựng trang thông tin chuyên nghiệp, tiếp cận tập người dùng có nhu cầu y tế.",
            type: "normal",
        },
        // Banner giữa
        {
            type: "banner",
            image: "/images/IntroDW/banner-doctor.webp",
            title: "Miễn phí sử dụng",
            buttonText: "ĐĂNG KÝ NGAY",
            link: "https://app.doctorworkspace.com/sign-up",
        },
        {
            icon: "/images/IntroDW/feature-icon-5.png",
            title: "AI hỗ trợ bác sĩ",
            description: "Tăng cường hiệu quả điều trị và tiết kiệm thời gian",
            type: "normal",
        },
        {
            icon: "/images/IntroDW/feature-icon-6.png",
            title: "Hệ thống đặt khám thông minh",
            description: "3 bước đặt khám, 2 lần nhắc lịch, 1 nơi lưu trữ kết quả khám.",
            type: "normal",
        },
        {
            icon: "/images/IntroDW/feature-icon-7.png",
            title: "Trung tâm xét nghiệm vệ tinh",
            description: "Nhiều trung tâm phù hợp với nhu cầu, quá trình thực hiện tự động và minh bạch.",
            type: "normal",
        },
        {
            icon: "/images/IntroDW/feature-icon-8.png",
            title: "Nhà thuốc vệ tinh",
            description: "Tỏa thuốc được xử lý bởi mạng lưới các nhà thuốc vệ tinh.",
            type: "normal",
        },
        {
            icon: "/images/IntroDW/feature-icon-9.png",
            title: "Thông tin y tế",
            description: "Thông tin nhanh chóng và chính thống.",
            type: "normal",
        },
    ];

    return (
        <section className="features-section-dw">
            <div className="features-header-dw">
                <h2><span className="highlight-number-dw">9</span> công cụ bạn cần duy nhất <span className="highlight-number-dw">1</span> nền tảng</h2>
                <p>Nâng cấp hoạt động khám chữa bệnh với Doctor Workspace: thông minh hơn, nhanh hơn, hiệu quả hơn</p>
            </div>
            <div className="features-grid-dw">
                {featureCards.map((card, index) => (
                    card.type === "normal" ? (
                        <div key={index} className="feature-card-dw">
                            <div className="feature-icon-wrapper-dw">
                                <img src={card.icon} alt={card.title} />
                            </div>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ) : (
                        <div key={index} className="feature-banner-dw">
                            <img src={card.image} alt="Doctor Workspace" className="banner-image-dw" />
                            <div className="banner-content-dw">
                                <p className="banner-subtitle-dw">{card.subtitle}</p>
                                <h3 className="banner-title-dw">{card.title}</h3>
                                <a href={card.link} className="banner-button-dw">
                                    {card.buttonText}
                                </a>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;