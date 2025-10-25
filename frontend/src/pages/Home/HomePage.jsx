import React from "react";
import Header from "./Header";
import HomeBanner from "./HomeBanner";
import HomeSpecialty from "./HomeSpecialty";
import HomeDoctor from "./HomeDoctor";
import HomeHospital from "./HomeHospital";
import SuggestionSection from "./SuggestionSection";
import DownloadApp from "./DownloadApp";
import HomeFooter from "./HomeFooter";


const HomePage = () => {
  return (
    <div>
      <Header />  
      <HomeBanner />
      <HomeSpecialty />
      <HomeDoctor />
      <HomeHospital />
      <SuggestionSection />
      <DownloadApp />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
