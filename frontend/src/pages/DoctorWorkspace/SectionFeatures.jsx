import React from "react";
import "../../assets/Home/DocterWorkspace.css";

const SectionFeatures = () => {
    return (
        <section className="sf-container">
            <div className="sf-grid">

                {/* LEFT GRID */}
                <div className="sf-left">

                    {/* Banner 1 */}
                    <div className="sf-banner-large">
                        <img src="/images/IntroDW/main-cta.webp" alt="banner1" className="sf-img" />
                        <div className="sf-overlay"></div>

                        <div className="sf-banner-text">
                            <h3>Special Offer</h3>
                            <p>Tận hưởng những ưu đãi đặc biệt khi đặt lịch ngay hôm nay!</p>
                            <span className="sf-link">Xem ngay →</span>
                        </div>
                    </div>

                    {/* Banner 2 */}
                    <div className="sf-banner-main">
                        <img src="/images/banner2.webp" alt="banner2" className="sf-img" />
                        <div className="sf-overlay"></div>

                        <div className="sf-banner-text small">
                            <h3>Your Health, Our Priority</h3>
                            <p>Đặt lịch khám nhanh chóng, tiện lợi với hệ thống tối ưu.</p>
                            <span className="sf-link">Khám phá ngay →</span>
                        </div>
                    </div>

                    {/* 2 small banners */}
                    <div className="sf-small-grid">
                        <div className="sf-small-box">
                            <img src="/images/banner3.png" alt="" className="sf-img" />
                            <div className="sf-overlay"></div>
                            <span className="sf-small-text">Ưu đãi cho thành viên →</span>
                        </div>

                        <div className="sf-small-box">
                            <img src="/images/banner4.png" alt="" className="sf-img" />
                            <div className="sf-overlay"></div>
                            <span className="sf-small-text">Đặt lịch nhanh →</span>
                        </div>
                    </div>

                </div>

                {/* RIGHT GRID */}
                <div className="sf-right">
                    <div className="sf-banner-tall">
                        <img src="/images/banner5.webp" alt="" className="sf-img" />
                        <div className="sf-overlay"></div>

                        <div className="sf-banner-text tall">
                            <h3>Health First</h3>
                            <p>Chúng tôi cung cấp dịch vụ chăm sóc toàn diện và hiệu quả.</p>
                            <span className="sf-link">Khám phá ngay →</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SectionFeatures;