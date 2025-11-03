import React from "react";
import Header from "./Home/Header";
import Banner from "./Home/HomeBanner";
import Footer from "./Home/HomeFooter";
import DownloadApp from "./Home/DownloadApp";

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