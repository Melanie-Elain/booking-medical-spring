import React from "react";
import Header from "../pages/Home/Header";
import Banner from "../pages/Home/HomeBanner";
import Footer from "../pages/Home/HomeFooter";

const MainLayout = ({ children }) => {
    return (
        <div>
            <Banner />
            <div className="main-content">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;