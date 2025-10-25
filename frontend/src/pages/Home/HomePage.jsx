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


const HomePage = () => {
  return (
    <div>
      <Header />  
      <HomeBanner />
      <HomeDoctor />
      <HomeHospital />
      <HomeClinic />
      <HomeSpecialty />
      <SuggestionSection />
      <DownloadApp />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
