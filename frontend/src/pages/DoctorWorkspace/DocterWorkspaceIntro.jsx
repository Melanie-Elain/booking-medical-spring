import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import DwHomeIntro from "./SectionDW-HomeIntro.jsx"
import DwSecurity from "./SectionDW-Security.jsx";
import DwFeatures from "./SectionDW-Features.jsx";
import DwFAQ from "./SectionDW-FAQ.jsx";

import HomeFooter from "../../components/Home/HomeFooter.jsx";
import "../../assets/Home/DocterWorkspace.css";

const DoctorWorkspaceIntro = () => {
    const location = useLocation();

    useEffect(() => {
        const header = document.querySelector(".sticky-header");

        const handleScroll = () => {
            if (window.scrollY > 10) {
                header?.classList.add("scrolled");
            } else {
                header?.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Kiểm tra xem URL có "hash" (dấu #) không
        if (location.hash) {
            // location.hash sẽ là "#security". Chúng ta cần "security"
            const id = location.hash.substring(1);

            // Dùng setTimeout 100ms để đảm bảo
            // component con (DwSecurity) đã kịp render
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100); // Đợi 100ms
        }
    }, [location]);

    return (
        <div className="doctor-workspace-page">
            {/* HEADER */}
            <header className="header-IntroWS sticky-header">
                <div className="header-container-IntroWS">
                    {/* Left side */}
                    <div className="header-left">
                        <div className="logo-boxIntroWS">
                            <a href="/" aria-label="Home Page">
                                <img src="/images/logo-doctorworkspace.png" alt="logo" className="logo-IntroWS" />
                            </a>
                        </div>
                    </div>

                    {/* Center Nav */}
                    <nav className="nav">
                        <a href="/doctor-workspace-intro/#homeIntro" className="active">
                            Trang chủ
                        </a>
                        <a href="/doctor-workspace-intro/#features">Tính năng</a>
                        <a href="/doctor-workspace-intro/#security">Bảo mật</a>
                    </nav>

                    {/* Right buttons */}
                    <div className="header-right">
                        <a
                            href="https://app.doctorworkspace.com/sign-in"
                            className="btn-secondary"
                        >
                            Đăng nhập
                        </a>
                        <a
                            href="https://app.doctorworkspace.com/sign-up"
                            className="btn-primary"
                        >
                            Đăng ký ngay
                        </a>
                    </div>
                </div>
            </header>

            {/* Nội dung trang chính (ví dụ placeholder) */}
            <main className="main-content-IntroWS">
                < DwHomeIntro />
                < DwFeatures />
                <DwSecurity />
                < DwFAQ />
                < HomeFooter />
            </main>
        </div>
    );
};

export default DoctorWorkspaceIntro;