
import React, { useEffect, useState } from "react";
import BookingTab from "../../components/Booking/BookingTab";
import HomeDoctor from "../../components/Home/HomeDoctor";
import HomeSpecialty from "../../components/Home/HomeSpecialty";
import BookingHospital from "./BookingHospital";
import BookingClinic from "./BookingClinic";
import BookingDoctorIntro from "../Booking/BookingDoctorIntro";
import BookingVaccination from "../Booking/BookingVaccination";
import BookingLabTest from "../Booking/BookingLabTest";

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
            { selectedTab === 4 && <BookingVaccination /> }
            { selectedTab === 5 && <BookingLabTest /> }
            <HomeSpecialty isBookingPage={true}/>
            {selectedTab === 1 && <BookingDoctorIntro />}
        </div>
    );
}
export default BookingPage;