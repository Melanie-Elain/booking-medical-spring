import React from "react";
import "../../assets/Home/OnlineConsultation.css";

const VideoSection = () => {
    return (
        <section id="video" className="video-section">
            <div className="video-container">
                {/* Video bên phải */}
                <div className="video-right">
                    <video
                        id="player"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="https://cdn.youmed.vn/wp-content/themes/youmed/images/poster.jpg"
                        className="video-player"
                    >
                        <source
                            src="https://cdn.youmed.vn/wp-content/themes/youmed/images/tele-video.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>

                {/* Nội dung bên trái */}
                <div className="video-left">
                    <h2 className="video-title">An tâm chăm sóc sức khỏe tại nhà</h2>
                    <p className="video-description">
                        Kết nối bạn với các bác sĩ hàng đầu thông qua gọi video và gọi thoại
                        trên ứng dụng YouMed
                    </p>

                    {/* Hàng bác sĩ */}
                    <div className="doctor-row">
                        <div className="doctor-avatars">
                            <img
                                src="https://cdn.youmed.vn/photos/3e400fb3-0a41-4686-9a3a-8b01e488a367.png"
                                alt="doctor"
                                className="doctor-img"
                            />
                            <img
                                src="https://cdn.youmed.vn/photos/1bd8ca79-9e6d-46fb-9b64-3d2a7cc736f2.jpg"
                                alt="doctor"
                                className="doctor-img"
                            />
                            <img
                                src="https://cdn.youmed.vn/photos/10882d42-34b8-4632-b0ef-67f42706fa19.jpg"
                                alt="doctor"
                                className="doctor-img"
                            />
                        </div>
                        <p className="doctor-text">200+ bác sĩ sẵn sàng giúp bạn</p>
                    </div>

                    {/* Nút tải app */}
                    <div className="store-buttons">
                        <a
                            href="https://youmed.onelink.me/HcIf/cf28e244"
                            title="Download Google Play"
                        >
                            <img
                                src="https://cdn.youmed.vn/wp-content/themes/youmed/images/google-play.svg"
                                alt="Google Play"
                                className="store-img"
                            />
                        </a>
                        <a
                            href="https://youmed.onelink.me/HcIf/cf28e244"
                            title="Download Apple Store"
                        >
                            <img
                                src="https://cdn.youmed.vn/wp-content/themes/youmed/images/apple-store.svg"
                                alt="Apple Store"
                                className="store-img"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;