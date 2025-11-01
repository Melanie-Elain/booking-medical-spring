import React, { Children } from "react";
import Header from "../pages/Home/Header";
import Banner from "../pages/Home/HomeBanner";
import Footer from "../pages/Home/HomeFooter";
import DownloadApp from "../pages/Home/DownloadApp";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
    const location = useLocation();
    const isBookingPage = location.pathname.includes("/dat-kham");
    return (
        <div>
            <Header />  
            
            <Banner />
            <div className="main-content">
                {children}
            </div>
             <DownloadApp isBookingPage ={isBookingPage}/>
                
            <Footer />
        </div>
    );
}

export default MainLayout;