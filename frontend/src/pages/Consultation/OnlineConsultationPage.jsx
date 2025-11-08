import React from "react";
import SpecialtySection from "./SpecialtySection";
import StepsSection from "./StepsSection";
import InfoSection from "./InfoSection";
import VideoSection from "./VideoSection";
import FAQSection from "./FAQSection";
import "../../assets/Home/OnlineConsultation.css";

const OnlineConsultationPage = () => {
    return (
        <section className="consultation-container">
            <SpecialtySection />
            <StepsSection />
            <InfoSection />
            <VideoSection />
            <FAQSection />
        </section>
    );
};

export default OnlineConsultationPage;