import React from "react";
import Header from "../pages/Home/Header";
import Banner from "../pages/Home/HomeBanner";
import Footer from "../pages/Home/HomeFooter";
import DownloadApp from "../pages/Home/DownloadApp";

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />  
            
            <Banner />
            <div className="main-content">
                {children}
            </div>
             <DownloadApp />
            <Footer />
        </div>
    );
}

export default MainLayout;