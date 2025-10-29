import React from "react";
import HomeFooter from "../Home/HomeFooter";
import HomeBanner from "../Home/HomeBanner";
import BookingTab from "../../components/BookingTab";
import HomeDoctor from "../Home/HomeDoctor";
import HomeSpecialty from "../Home/HomeSpecialty";
import BookingHospital from "./BookingHospital";

const BookingPage = () => {
    const [selectedTab, setSelectedTab] = React.useState(1);
    return (
        <div>
            
            <BookingTab onTabChange={setSelectedTab}/>
            { selectedTab === 1 && <HomeDoctor isBookingPage={true} /> }
            { selectedTab === 2 && <BookingHospital /> }
            
            <HomeSpecialty />
        </div>
    );
}
export default BookingPage;