import React, { useState, useEffect } from "react";
import "../../assets/Home/DocterWorkspace.css";

// Danh sách các dòng chữ sẽ thay đổi
const rotatingSubtitles = [
    "Tối ưu quy trình và nâng cao hiệu quả hoạt động",
    "Tiếp cận bệnh nhân và tăng cường tương tác",
    "Quản lý lịch hẹn và hồ sơ bệnh án thông minh",
    "Xây dựng thương hiệu bác sĩ chuyên nghiệp"
];

const HomeIntroSection = () => {
    const [index, setIndex] = useState(0);
    const [subtext, setSubtext] = useState(rotatingSubtitles[0]);
    const [animation, setAnimation] = useState("fadeIn");

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimation("fadeOut");
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let timeout;
        if (animation === "fadeOut") {
            timeout = setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % rotatingSubtitles.length);
                setSubtext(rotatingSubtitles[(index + 1) % rotatingSubtitles.length]);
                setAnimation("fadeIn");
            }, 500);
        }
        return () => clearTimeout(timeout);
    }, [animation, index]);


    return (
        <section id="homeIntro" className="home-intro-section-dw">
            <div className="home-intro-content-dw">
                <h1>
                    Nền tảng tích hợp bộ công cụ làm việc
                    <br />
                    dành cho bác sĩ
                </h1>
                <div className="typing-wrapper-dw">
                    <p className={`typing-text-dw ${animation}`}>
                        {subtext}
                    </p>
                </div>
                <p className="free-tier-dw">Miễn phí sử dụng.</p>
                <a href="https://app.doctorworkspace.com/sign-up" className="btn-primary-intro-dw">
                    Đăng ký ngay
                </a>
            </div>
            <div className="intro-image-container-dw">
                <img src="/images/IntroDW/intro-dashboard.png" alt="Doctor Workspace Dashboard" />
            </div>
        </section>
    );
};

export default HomeIntroSection;