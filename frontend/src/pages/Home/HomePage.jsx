import React from "react";
import Header from "./Header";
import HomeBanner from "./HomeBanner";
import HomeDoctor from "./HomeDoctor";
import HomeHospital from "./HomeHospital";
import HomeClinic from "./HomeClinic";
import HomeSpecialty from "./HomeSpecialty";
import SuggestionSection from "./SuggestionSection";
import DownloadApp from "./DownloadApp";
import HomeFooter from "./HomeFooter";
import HomeNews from "./HomeNews";


const HomePage = () => {
  return (
    <div>
      <HomeDoctor isBookingPage={false} />
      <HomeHospital />
      <HomeClinic />
      <HomeSpecialty />
      <HomeNews />
      <SuggestionSection />
    </div>
  );
};

export default HomePage;
