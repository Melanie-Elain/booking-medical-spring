import React, { useState } from "react";
import "../../assets/Home/DocterWorkspace.css";

const DoctorWorkspacePage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            {/* HEADER */}
            <header className="header">
                <div className="header-container">
                    {/* Left side */}
                    <div className="header-left">
                        <div className="logo-box">
                            <a href="/" aria-label="Home Page">
                                <img src="https://doctorworkspace.com/images/svg/logo.svg" alt="logo" className="logo" />
                            </a>
                        </div>
                        <span className="hotline">
                            Tổng đài hỗ trợ:{" "}
                            <a href="tel:19002815" className="hotline-link">
                                1900 2815
                            </a>
                        </span>
                    </div>

                    {/* Center Nav */}
                    <nav className="nav">
                        <a href="/#" className="active">
                            Trang chủ
                        </a>
                        <a href="/#features">Tính năng</a>
                        <a href="/#security">Bảo mật</a>
                        <a href="/#pricing">Bảng giá</a>
                    </nav>

                    {/* Right buttons (desktop) */}
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

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="menu-toggle"
                        aria-label="Open menu"
                        onClick={toggleMenu}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            fill="none"
                        >
                            <path d="M21 5H13" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M21 12H8" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M21 19H3" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                    <div className="mobile-menu-header">
                        <div className="logo-box">
                            <a href="/" aria-label="Home Page">
                                <img src= "https://doctorworkspace.com/images/svg/logo.svg" alt="logo" className="logo" />
                            </a>
                        </div>
                        <button
                            type="button"
                            className="close-btn"
                            aria-label="Close menu"
                            onClick={closeMenu}
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="mobile-nav">
                        <a href="/#" onClick={closeMenu}>
                            Trang chủ
                        </a>
                        <a href="/#features" onClick={closeMenu}>
                            Tính năng
                        </a>
                        <a href="/#security" onClick={closeMenu}>
                            Bảo mật
                        </a>
                        <a href="/#pricing" onClick={closeMenu}>
                            Bảng giá
                        </a>
                    </nav>

                    <div className="mobile-hotline">
                        Tổng đài hỗ trợ:{" "}
                        <a href="tel:19002815" className="hotline-link">
                            1900 2815
                        </a>
                    </div>

                    <div className="mobile-btn-group">
                        <a
                            href="https://app.doctorworkspace.com/sign-in"
                            className="btn-secondary mobile-btn"
                        >
                            Đăng nhập
                        </a>
                        <a
                            href="https://app.doctorworkspace.com/sign-up"
                            className="btn-primary mobile-btn"
                        >
                            Đăng ký ngay
                        </a>
                    </div>
                </div>
            </header>

            {/* Nội dung trang chính (ví dụ placeholder) */}
            <main className="main-content">
                <h1>Doctor Workspace Landing Page</h1>
                <p>Đây là phần nội dung chính của trang.</p>
            </main>
        </>
    );
};

export default DoctorWorkspacePage;