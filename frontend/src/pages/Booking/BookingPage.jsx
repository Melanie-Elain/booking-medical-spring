import React, { useEffect, useState } from "react";
import HomeFooter from "../Home/HomeFooter";
import HomeBanner from "../Home/HomeBanner";
import BookingTab from "../../components/BookingTab";
import HomeDoctor from "../Home/HomeDoctor";
import HomeSpecialty from "../Home/HomeSpecialty";
import BookingHospital from "./BookingHospital";
import BookingClinic from "./BookingClinic";
import BookingDoctorIntro from "../Booking/BookingDoctorIntro";

const BookingPage = ({ selectedTab: initialTab = 1 }) => {
    const [selectedTab, setSelectedTab] = useState(1);
    useEffect(() => {
        setSelectedTab(initialTab);
    }, [initialTab]);
    return (
        <div>           
            <BookingTab onTabChange={setSelectedTab} selected={selectedTab}/>
            { selectedTab === 1 && <HomeDoctor isBookingPage={true} /> }
            { selectedTab === 2 && <BookingHospital /> }
            { selectedTab === 3 && <BookingClinic /> }
            <HomeSpecialty isBookingPage={true}/>
            {selectedTab === 1 && <BookingDoctorIntro />}
        </div>
    );
}
export default BookingPage;