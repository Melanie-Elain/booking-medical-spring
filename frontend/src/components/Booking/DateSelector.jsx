import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DoctorService } from "../../api/DoctorService";


const DateSelector = ({ onTimeSelect, doctorId }) => {

    const [schedulesData, setSchedulesData] = useState({}); 
    
    const [selectedDay, setSelectedDay] = useState(null); 
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedMaGio, setSelectedMaGio] = useState(null);

    const days = Object.keys(schedulesData); 
    const times = schedulesData[selectedDay] || [];

    useEffect(() => {
        const fetchDoctorSchedules = async () => {
            try {
                console.log("Fetching schedules for doctorId:", doctorId);
                const fetchedData = await DoctorService.getDoctorSchedules(doctorId);
                console.log("Fetched schedules data:", fetchedData);
                setSchedulesData(fetchedData || {});
                
                const firstDay = Object.keys(fetchedData || {})[0];
                if (firstDay) {
                    setSelectedDay(firstDay);
                }
            } catch (error) {
                console.error("Lỗi khi tải lịch làm việc bác sĩ:", error);
            }
        };
        
        if (doctorId) {
            fetchDoctorSchedules();
        }
        
    }, [doctorId]);

    const handleTimeClick = (timeObject) => {
        setSelectedTime(timeObject.time);  
        setSelectedMaGio(timeObject.id); 
        
        onTimeSelect(selectedDay, timeObject.time, timeObject.id);
    };

    const handleDayClick = (day) => {
        if (day === selectedDay) return;
        
        setSelectedDay(day);
        setSelectedTime(null); 
        setSelectedMaGio(null);
        onTimeSelect(null, null,null); 
    }

    // ==========================================================
    // 3. LOGIC SCROLL
    // ==========================================================
    const scrollRef = React.useRef(null);
    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    };
    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    };

    // ==========================================================
    // 4. RENDER
    // ==========================================================
    
    // Hiển thị loading hoặc thông báo nếu không có lịch
    if (days.length === 0) {
        return (
            <div className="text-gray-500 p-4 text-center border rounded-lg bg-gray-50">
                {!schedulesData ? "Đang tải lịch..." : "Bác sĩ chưa có lịch làm việc trong thời gian này."}
            </div>
        );
    }
    
    return (
        <>
            <div className="mt-4 ">
                <h2 className="font-semibold text-lg mb-2">Đặt khám nhanh</h2>
                <div className="flex items-center relative">
                    <button onClick={scrollLeft}
                        className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10">
                        <ChevronLeft size={22}/>
                    </button>
                    <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide pb-1 scroll-smooth ">

                        {days.map((day, index) => (
                            <button
                                key={index}
                                onClick={() => handleDayClick(day)}
                                className={`flex-shrink-0 px-4 py-2 transition font-semibold relative ${
                                    day === selectedDay
                                    ? "bg-blue-50 "
                                    : " hover:bg-gray-200"
                                }`}
                                >
                                <span className="block text-base">{day}</span>
                                <span className="block text-sm text-green-500 font-normal">{schedulesData[day]?.length || 0} khung giờ</span>
                                {day === selectedDay && (
                                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t"></span>
                                )}
                            </button>
                        ))}
                    </div>
                    <button onClick={scrollRight}
                        className=" absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10">
                        <ChevronRight size={22}/>
                    </button>
                </div>
            </div>

            {/* Khung giờ */}
            <div className="mt-6">
                <h2 className="font-semibold text-lg mb-2">Chọn khung giờ</h2>
                <div className="grid grid-cols-6 gap-2">
                    {/* RENDER KHUNG GIỜ */}
                    {times.map((timeObject) => (
                        <button
                        key={timeObject.id}
                        onClick={() => { 
                            console.log("Time selected:", timeObject);
                            handleTimeClick(timeObject);
                        }}
                        className={`border rounded-lg py-2 transition font-medium ${
                            timeObject === selectedTime 
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "border-gray-300 hover:bg-blue-500 hover:text-white"
                        }`}
                        >
                        {timeObject.time}
                        </button>
                    ))}
                </div>
                {times.length === 0 && selectedDay && (
                    <p className="text-gray-500 mt-2">Không có khung giờ trống nào cho ngày {selectedDay}.</p>
                )}
            </div>
        </>
    );
}
export default DateSelector;