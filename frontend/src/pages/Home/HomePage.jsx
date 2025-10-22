import React from "react";
import HomeBanner from "./HomeBanner";
import HomeDoctor from "./HomeDoctor";
import HomeHospital from "./HomeHospital";
import HomeClinic from "./HomeClinic";
import HomeSpecialty from "./HomeSpecialty";
import HomeFooter from "./HomeFooter";

const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <HomeDoctor />
      <HomeHospital />
      <HomeClinic/>
      <HomeSpecialty />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
