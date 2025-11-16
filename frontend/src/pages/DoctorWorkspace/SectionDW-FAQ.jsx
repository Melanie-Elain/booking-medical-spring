import React, { useState } from "react";
import "../../assets/Home/DocterWorkspace.css";

const dwFaqs = [
    {
        question: "Doctor Workspace là gì?",
        answer:
            "Doctor Workspace là nền tảng hỗ trợ bác sĩ quản lý hoạt động khám chữa bệnh, hồ sơ, lịch hẹn và nhiều công cụ chuyên môn.",
    },
    {
        question: "Tôi không có phòng khám riêng, liệu có dùng được không?",
        answer:
            "Có. Doctor Workspace được thiết kế cho cả bác sĩ có và không có phòng mạch tư. Không có phòng mạch tư, bạn vẫn có thể dùng các công cụ như: Tư vấn trực tuyến, Quảng bá thương hiệu bác sĩ, Chỉ định thuốc và cận lâm sàng đến các cơ sở liên kết chính thức với Doctor Workspace, Học CME, Đọc tin y khoa.",
    },
    {
        question: "Doctor Workspace có thu phí hằng năm không?",
        answer:
            "Có. Doctor Workspace thu phí 250.000/tháng cho công cụ Quản lý phòng khám Advance có tính năng Liên thông Cổng Đơn thuốc Quốc gia và tính năng Hồ sơ bệnh án điện tử. Bạn có thể liên hệ 1900.2815 để biết thêm thông tin.",
    },
    {
        question: "Tôi có thể phát triển thương hiệu cá nhân trên Doctor Workspace bằng cách nào?",
        answer:
            "Bạn có thể cập nhật hồ sơ cá nhân, chuyên môn, hình ảnh, dịch vụ để bệnh nhân dễ dàng tìm thấy và đặt khám.",
    },
    {
        question: "Tôi đang dùng phần mềm khác, có chuyển đổi dữ liệu qua Doctor Workspace được không?",
        answer:
            "Có. Đội ngũ kỹ thuật sẽ hỗ trợ bạn chuyển đổi dữ liệu từ hệ thống cũ sang Doctor Workspace.",
    },
    {
        question: "Tôi cần cung cấp những thông tin gì để bắt đầu sử dụng Doctor Workspace?",
        answer:
            "Bạn chỉ cần cung cấp thông tin cá nhân, chứng chỉ hành nghề và một số dữ liệu cơ bản để kích hoạt tài khoản.",
    },
];

const DoctorWorkspaceFAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section className="dw-faq-section">
            <div className="dw-faq-wrapper">

                {/* LEFT SIDE */}
                <div className="dw-faq-left">
                    <h2 className="dw-faq-heading">Một số câu hỏi thường gặp</h2>

                    <p className="dw-faq-sub">
                        Nếu bạn không tìm thấy thông tin mình đang tìm kiếm?{" "}
                        <a href="#" className="dw-faq-link">Liên hệ với chúng tôi</a>
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="dw-faq-right">
                    {dwFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`dw-faq-item ${openIndex === index ? "open" : ""}`}
                        >
                            <div
                                className="dw-faq-question"
                                onClick={() => toggle(index)}
                            >
                                <span className="dw-faq-question-text">
                                    {faq.question}
                                </span>

                                <span className="dw-faq-icon">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </div>

                            {openIndex === index && (
                                <div className="dw-faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DoctorWorkspaceFAQ;