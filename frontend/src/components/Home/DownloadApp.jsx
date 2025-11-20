import React from 'react';
import "../../assets/Home/DownloadApp.css"; 

const DownloadApp = ({isBookingPage =false}) => {

    const securityItems = [
        { 
            title: "Hệ thống đạt tiêu chuẩn", 
            subtitle: "ISO 27001:2013", 
            icon: "https://cdn-icons-png.flaticon.com/512/2920/2920803.png"
        },
        { 
            title: "Thông tin sức khỏe được bảo mật theo quy chuẩn", 
            subtitle: "HIPAA", 
            icon: "https://cdn-icons-png.flaticon.com/512/179/179262.png"
        },
        { 
            title: "Thành viên", 
            subtitle: "VNISA", 
            icon: "https://cdn-icons-png.flaticon.com/512/1653/1653818.png"
        },
        { 
            title: "Pentest định kỳ", 
            subtitle: "hàng năm", 
            icon: "https://cdn-icons-png.flaticon.com/512/3592/3592881.png"
        },
    ];

    return (
        <div className="download-app-section">
            
            {/* -------------------- KHUNG 1: TIN TỨC VÀ HƯỚNG DẪN (Nền trắng) -------------------- */}
            {!isBookingPage ? (
            <div className="news-and-guide-container">
                
                {/* Cột 1: Video Hướng dẫn */}
                <div className="video-guide-box">
                    {/* Placeholder cho ảnh video/thumbnail */}
                    <div className="video-thumbnail-placeholder">
                        <img 
                            src="https://i.ytimg.com/vi/MftRcZCHbwI/hqdefault.jpg" 
                            alt="Play: Video"
                            id="fallbackPlaceholder"
                            loading="lazy"
                            referrerPolicy="origin"
                        />
                        <div className="video-overlay">
                            <div className="bell-icon"></div>
                            <div className="play-icon"></div>
                        </div>
                    </div>
                    <p className="guide-title">Hướng dẫn tải và sử dụng app YouMed</p>
                </div>

                {/* Cột 2: Tin tức và tính năng nổi bật */}
                <div className="news-features-column">
                    <h3 className="news-title">Tin tưởng ở YouMed</h3>

                    {/* Row 1: Ứng dụng smartphone & Chuyên đề sức khỏe */}
                    <div className="news-row">
                        <div className="news-item small-item">
                            <div className="item-content">
                                <h4>Thành tựu</h4>
                                <p>Ứng dụng smartphone giúp đặt lịch khám bệnh</p>
                            </div>
                            <img src="https://images2.thanhnien.vn/zoom/600_315/Uploaded/nthanhluan/2019_06_16/2_NERS.jpg" alt="Đặt lịch khám bệnh" />
                        </div>
                        <div className="news-item small-item">
                            <div className="item-content">
                                <h4>Sức khỏe</h4>
                                <p>"Chuyên đổi số y tế - xu hướng không thể đi ngược trong thời đại 4.0"</p>
                            </div>
                            <img src="https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2022/5/16/1-1652672040175585266435.jpg" alt="Chuyên đề sức khỏe" />
                        </div>
                    </div>

                    {/* Row 2: Bệnh viện hợp tác */}
                    <div className="news-row">
                        <div className="news-item large-item">
                            <div className="item-content">
                                <h4>Thành tựu</h4>
                                <p>Bệnh viện Quân y 175 ra mắt ứng dụng đặt khám trực tuyến</p>
                            </div>
                            <img src="https://cdn.youmed.vn/wp-content/uploads/2023/05/bv-quan-y-175.jpg?width=120" alt="Bệnh viện Quân y 175" />
                        </div>
                        <div className="news-item large-item">
                            <div className="item-content">
                                <h4>Thành tựu</h4>
                                <p>Bệnh viện Y học Cổ Truyền có mặt trên ứng dụng YouMed</p>
                            </div>
                            <img src="https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2021/08/leaflet-01-e1634787653628.png" alt="Bệnh viện Y học Cổ Truyền" />
                        </div>
                    </div>
                </div>
            </div>): null}

            {/* -------------------- KHUNG 2: TẢI ỨNG DỤNG (Nền xanh) -------------------- */}
            <div className="download-app-banner">
                <div className="download-content-left">
                    <h2 className="banner-title">Tải ứng dụng YouMed</h2>
                    <ul className="feature-list">
                        <li>Đặt lịch khám bệnh và xét nghiệm</li>
                        <li>Tư vấn trực tuyến với Bác sĩ</li>
                        <li>Lưu trữ hồ sơ sức khoẻ</li>
                        <li>Thanh toán dịch vụ trực tuyến</li>
                    </ul>
                    <div className="app-stores" style={{ display: "flex", gap: "16px", justifyContent: "center", alignItems: "center" }}>
                        {/* Thay thế bằng link ảnh Google Play và App Store thực tế */}
                        <img src="https://cdn.youmed.vn/wp-content/themes/youmed/images/google-play.svg" alt="Tải trên Google Play" />
                        <img src="https://cdn.youmed.vn/wp-content/themes/youmed/images/apple-store.svg" alt="Tải trên App Store" />
                    </div>
                </div>
                
                {/* Phần minh họa điện thoại (cần dùng ảnh lớn) */}
                <div className="phone-mockup-right">
                    <img 
                        src="https://cdn.youmed.vn/wp-content/themes/youmed/images/app-download.svg" // Thay thế bằng ảnh minh họa điện thoại thực tế
                        alt="Giao diện ứng dụng YouMed" 
                    />
                </div>
            </div>

{/* -------------------- KHUNG 3: BẢO MẬT DỮ LIỆU (Nền trắng) -------------------- */}
            {!isBookingPage ? (
            <section className="data-security-section">
                <h2 className="security-main-title">Bảo mật dữ liệu</h2>
                <p className="security-subtitle">An toàn dữ liệu của bạn là ưu tiên hàng đầu của chúng tôi</p>
                
                <div className="security-items-wrapper">
                    {securityItems.map((item, index) => (
                        <div className="security-item" key={index}>
                            <div className="icon-box">
                                <img src={item.icon.startsWith('/') ? 'https://cdn-icons-png.flaticon.com/512/2920/2920803.png' : item.icon} alt={item.title} /> 
                            </div>
                            <p className="item-title">{item.title}</p>
                            <p className="item-subtitle">{item.subtitle}</p>
                        </div>
                    ))}
                </div>

                <div className="security-description">
                    <p>
                        Với nhiều năm kinh nghiệm trong lĩnh vực Y tế, chúng tôi hiểu rằng,
                        dữ liệu sức khoẻ của bạn chỉ thuộc về bạn. YouMed tuân thủ các 
                        chính sách bảo mật dữ liệu cao nhất trên thế giới.
                    </p>
                </div>
            </section>) : null}
        </div>
    );
};

export default DownloadApp;