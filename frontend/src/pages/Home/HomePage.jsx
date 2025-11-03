import React from "react";
import Header from "../../components/Home/Header";
import HomeBanner from "../../components/Home/HomeBanner";
import HomeDoctor from "../../components/Home/HomeDoctor";
import HomeHospital from "../../components/Home/HomeHospital";
import HomeClinic from "../../components/Home/HomeClinic";
import HomeSpecialty from "../../components/Home/HomeSpecialty";
import SuggestionSection from "../../components/Home/SuggestionSection";
import DownloadApp from "../../components/Home/DownloadApp";
import HomeFooter from "../../components/Home/HomeFooter";
import HomeNews from "../../components/Home/HomeNews";


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
