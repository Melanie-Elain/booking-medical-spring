import React, { useState, useEffect } from "react";
import "../../assets/Home/OnlineConsultation.css";
import choose from '../../assets/images/step/choose.png';
import booking from '../../assets/images/step/booking.png';
import call from '../../assets/images/step/call.png';
import results from '../../assets/images/step/results.png';

const steps = [
    {
        title: "Bước 1: Chọn bác sĩ chuyên khoa",
        desc: "Tìm kiếm và chọn bác sĩ phù hợp để được tư vấn.",
        img: choose,
    },
    {
        title: "Bước 2: Gọi ngay hoặc đặt lịch tư vấn",
        desc: "Gọi hoặc đặt lịch với bác sĩ để được tư vấn.",
        img: booking,
    },
    {
        title: "Bước 3: Tư vấn qua video hoặc audio",
        desc: "Trò chuyện trực tiếp cùng bác sĩ.",
        img: call,
    },
    {
        title: "Bước 4: Nhận kết quả tư vấn",
        desc: "Bạn được trả kết quả ngay tư vấn.",
        img: results,
    },
];

const StepsSection = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="steps-section">
            <div className="step-header">
                <h1 className="step-title">Thao tác đơn giản với 4 bước</h1>
            </div>
            <div className="step-content">
                <div className="steps-left">
                    <img
                        src={steps[activeStep].img}
                        alt={steps[activeStep].title}
                        className="step-image"
                    />
                </div>
                <div className="steps-right">
                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className={`step ${i === activeStep ? "active" : ""}`}
                            onClick={() => setActiveStep(i)}
                        >
                            <h3 className="title-step">{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StepsSection;