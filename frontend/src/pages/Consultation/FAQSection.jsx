import React, { useState } from "react";
import "../../assets/Home/OnlineConsultation.css";

const faqs = [
    {
        question:
            "Trong trường hợp đã đặt hẹn và thanh toán nhưng vì lý do bận việc, tôi có được hoàn lại tiền hay không?",
        answer:
            "Bạn sẽ chỉ được hoàn tiền trong trường hợp huỷ cuộc tư vấn trước 6 tiếng so với giờ hẹn.",
    },
    {
        question: "Tôi sẽ liên hệ với ai khi có phản hồi hoặc khiếu nại?",
        answer:
            "Chúng tôi luôn coi trọng tất cả các phản hồi từ khách hàng để nâng cao chất lượng dịch vụ. Mọi ý kiến vui lòng gửi qua email cskh@youmed.vn hoặc hotline 1900 2805.",
    },
    {
        question: "Sau khi tư vấn tôi có nhận được kết quả không?",
        answer:
            "Được. Sau khi kết thúc cuộc tư vấn bác sĩ sẽ gửi kết quả trong vòng 2 tiếng. Nếu sau 2 tiếng bạn chưa nhận được, vui lòng liên hệ hotline 1900 2805 để được hỗ trợ.",
    },
    {
        question: "Chi phí một cuộc tư vấn trực tuyến là bao nhiêu?",
        answer:
            "Chi phí cuộc tư vấn tùy thuộc từng bác sĩ. Bạn có thể xem chi phí trong danh sách bác sĩ trước khi đặt lịch.",
    },
    {
        question: "Thời gian tư vấn sức khỏe trực tuyến trong vòng bao lâu?",
        answer:
            "Thời gian một cuộc gọi tư vấn sức khỏe trực tuyến là 15 phút. Nếu bạn muốn tư vấn thêm, vui lòng đăng ký một cuộc khác.",
    },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq-section">
            <div className="faq-wrapper">
                <h2 className="faq-title">Câu hỏi thường gặp</h2>
                <div className="faq-container">
                    <ul className="faq-list">
                        {faqs.map((faq, index) => (
                            <li key={index} className="faq-item">
                                <div
                                    className={`faq-question ${openIndex === index ? "active" : ""
                                        }`}
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span>{faq.question}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`faq-icon ${openIndex === index ? "rotate" : ""}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <div
                                    className={`faq-answer ${openIndex === index ? "show" : "hide"
                                        }`}
                                >
                                    <p>{faq.answer}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;