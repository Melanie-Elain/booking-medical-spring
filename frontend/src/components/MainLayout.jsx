
import React from "react";
import Header from "./Home/Header";
import Banner from "./Home/HomeBanner";
import Footer from "./Home/HomeFooter";
import DownloadApp from "./Home/DownloadApp";
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