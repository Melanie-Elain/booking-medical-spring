import React,{useState} from "react";
import { Star, Building, BriefcaseMedical, FlaskRound } from "lucide-react";

const tabs=[
    { id: 1, label: "Đặt khám Bác sĩ", icon: <Star size={18} /> },
    { id: 2, label: "Đặt khám Bệnh viện", icon: <Building size={18} /> },
    { id: 3, label: "Đặt khám Phòng khám", icon: <BriefcaseMedical size={18} /> },
    { id: 4, label: "Đặt lịch Tiêm chủng", icon: <FlaskRound size={18} /> },
]

const BookingTab = ({onTabChange}) => {
    const [active, setActive] = useState(1);
    const handleTabClick = (id) => {
        setActive(id);
        if (onTabChange) {
            onTabChange(id);
        }
    }
    return (
        <div className="booking-tab  flex justify-between align-items-center max-w-7xl mx-auto  ">
            {tabs.map((tab) => (
                <div 
                    key={tab.id} 
                    className={`tab-item flex flex-row justify-content-center align-items-center p-8 ${active === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                    
                >
                    <div className="tab-icon pr-3">
                        {tab.icon}
                    </div>
                    <div className="tab-label">
                        {tab.label}
                    </div>
                </div>
            ))}
        </div>
    );
}   

export default BookingTab;