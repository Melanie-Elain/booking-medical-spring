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
        <div className="booking-tab flex justify-between align-items-center max-w-7xl mx-auto gap-4">
            {tabs.map((tab) => (
                <div 
                    key={tab.id} 
                    className={`tab-item d-flex flex-column justify-content-center align-items-center py-3 px-4 ${active === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                >
                    <div className="tab-icon mb-2">
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