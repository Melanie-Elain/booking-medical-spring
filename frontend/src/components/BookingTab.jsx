import React,{useState, useEffect} from "react";
import { Star, Building, BriefcaseMedical, FlaskRound } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
    { id: 1, label: "Đặt khám Bác sĩ", icon: <Star size={18} />, path: "/dat-kham/bac-si" },
    { id: 2, label: "Đặt khám Bệnh viện", icon: <Building size={18} />, path: "/dat-kham/benh-vien" },
    { id: 3, label: "Đặt khám Phòng khám", icon: <BriefcaseMedical size={18} />, path: "/dat-kham/phong-kham" },
    { id: 4, label: "Đặt lịch Tiêm chủng", icon: <FlaskRound size={18} />, path: "/dat-kham/tiem-chung" },
  ];

const BookingTab = ({onTabChange, selectedTab}) => {
    const [active, setActive] = useState(selectedTab || 1);
    const navigate = useNavigate();
    const location = useLocation();

    // Cập nhật active khi route thay đổi
    useEffect(() => {
        const found = tabs.find(tab => location.pathname.startsWith(tab.path));
        if (found) {
        setActive(found.id);
        if (onTabChange) onTabChange(found.id);
        }
    }, [location.pathname]);

    const handleTabClick = (tab) => {
        setActive(tab.id);
        navigate(tab.path); // Điều hướng đến route tương ứng
        if (onTabChange) onTabChange(tab.id);
    };
    return (
        <div className="booking-tab flex justify-between align-items-center max-w-7xl mx-auto  ">
            {tabs.map((tab) => (
                <div 
                    key={tab.id} 
                    onClick={() => handleTabClick(tab.id)}
                    className={`tab-item flex flex-row justify-content-center align-items-center p-8 ${active === tab.id ? 'active' : ''}`}
                    
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