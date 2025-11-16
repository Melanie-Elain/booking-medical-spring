import React, { useState } from "react";
import Features from "./SectionFeatures.jsx";
import "../../assets/Home/DocterWorkspace.css";

const DoctorWorkspacePage = () => {
    return (
        <div className="doctor-workspace-page">
            {/* HEADER */}
            <header className="header-IntroWS">
                <div className="header-container-IntroWS">
                    {/* Left side */}
                    <div className="header-left">
                        <div className="logo-boxIntroWS">
                            <a href="/doctor-workspace" aria-label="Home Page">
                                <img src="/images/logo-doctorworkspace.png" alt="logo" className="logo-IntroWS" />
                            </a>
                        </div>
                    </div>

                    {/* Center Nav */}
                    <nav className="nav">
                        <a href="/#" className="active">
                            Trang chủ
                        </a>
                        <a href="/#features">Tính năng</a>
                        <a href="/#security">Bảo mật</a>
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

            </main>
        </div>
    );
};

export default DoctorWorkspacePage;