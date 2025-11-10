import React, { useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 

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
  const navigate = useNavigate(); 

  // 4. THÊM LOGIC KIỂM TRA ADMIN
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');

    // Nếu là ADMIN, lập tức chuyển hướng
    if (userRole === 'ADMIN') {
      navigate('/admin', { replace: true }); 
    }
  }, [navigate]); 

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