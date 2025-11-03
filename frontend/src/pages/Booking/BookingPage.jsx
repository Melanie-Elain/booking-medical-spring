import React from "react";
import HomeFooter from "../../components/Home/HomeFooter";
import HomeBanner from "../../components/Home/HomeBanner";
import BookingTab from "../../components/BookingTab";
import HomeDoctor from "../../components/Home/HomeDoctor";
import HomeSpecialty from "../../components/Home/HomeSpecialty";
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