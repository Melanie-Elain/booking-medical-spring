import React, { useEffect } from "react";
import DwSecurity from "./SectionDW-Security.jsx";
import DwFeatures from "./SectionDW-Features.jsx";
import DwFAQ from "./SectionDW-FAQ.jsx";
import HomeFooter from "../../components/Home/HomeFooter.jsx";
import "../../assets/Home/DocterWorkspace.css";

const DoctorWorkspaceIntro = () => {
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
                        <a href="/#" className="active">
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
                <div id="features">
                    < DwFeatures />
                </div>

                <div id="security">
                    <DwSecurity />
                </div>
                < DwFAQ />
                < HomeFooter />
            </main>
        </div>
    );
};

export default DoctorWorkspaceIntro;