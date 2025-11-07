import React from "react";
import "../../assets/Home/OnlineConsultation.css";

const InfoSection = () => {
    return (
        <div className="info-section">
            <div className="info-header">
                <h2 className="info-title">Tư vấn sức khoẻ online YouMed</h2>
                <p className="info-subtitle">Tiện ích cho mọi nhà</p>
            </div>

            <div className="info-grid">
                <div className="info-card">
                    <img
                        src="https://cdn.youmed.vn/wp-content/themes/youmed/images/TeleFeature1.png"
                        alt="Kết nối với bác sĩ chuyên khoa 24/7"
                    />
                    <h3> Kết nối với bác sĩ chuyên khoa 24/7 </h3>
                    <p>
                        Gọi ngay hoặc chủ động Đặt lịch tư vấn với các bác sĩ đầu ngành của YouMed.
                    </p>
                </div>

                <div className="info-card">
                    <img
                        src="https://cdn.youmed.vn/wp-content/themes/youmed/images/TeleFeature2.png"
                        alt="Bảo mật thông tin"
                    />
                    <h3> Bảo mật thông tin </h3>
                    <p>
                        Tuân theo đạo luật HIPAA và ứng dụng công nghệ cao, YouMed cam kết bảo mật toàn bộ thông tin cuộc tư vấn của bạn với bác sĩ.
                    </p>
                </div>

                <div className="info-card">
                    <img
                        src="https://cdn.youmed.vn/wp-content/themes/youmed/images/TeleFeature3.png"
                        alt="Tiện lợi và Tiết kiệm"
                    />
                    <h3> Tiện lợi và Tiết kiệm </h3>
                    <p>
                        Không tốn công di chuyển, không cần chờ khám. Kết nối với các bác sĩ đầu ngành chỉ với chiếc điện thoại của bạn.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;