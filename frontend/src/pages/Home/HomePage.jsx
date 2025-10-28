import React from "react";
import HomeBanner from "./HomeBanner";
import HomeSpecialty from "./HomeSpecialty";
import HomeDoctor from "./HomeDoctor";
import HomeHospital from "./HomeHospital";
import HomeFooter from "./HomeFooter";

const HomePage = () => {
  return (
    <div>
      <HomeSpecialty />
      <HomeDoctor />
      <HomeHospital />
    </div>
  );
};

export default HomePage;
