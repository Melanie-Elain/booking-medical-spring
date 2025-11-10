import React from "react";
import { useState } from "react";
import doctorsData from "../../data/doctorsData";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";


const DateSelector = ({ onTimeSelect }) => {

    const { id } = useParams();
    const doctor = doctorsData.find((d) => d.id === Number(id));
    const schedules = Object.keys(doctor.schedules || {});
    const [selectedDay, setSelectedDay] = useState(schedules[0]);
    const [selectedTime, setSelectedTime] = useState(null);
    const times = doctor.schedules[selectedDay] || [];

    const handleTimeClick = (time) => {
        setSelectedTime(time);           
        onTimeSelect(selectedDay, time); 
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setSelectedTime(null); 
        onTimeSelect(null, null); 
    }

    const scrollRef = React.useRef(null);
    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -150,
            behavior: "smooth",
        });
    };
    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 150,
            behavior: "smooth",
        });
    };

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

                            {schedules.map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() =>handleDayClick(day)}
                                    className={`flex-shrink-0 px-4 py-2  transition font-semibold relative ${
                                        day === selectedDay
                                        ? "bg-blue-50 "
                                        : " hover:bg-gray-200"
                                    }`}
                                    >
                                    <span className="block text-base">{day}</span>
                                    <span className="block text-sm text-green-500 font-normal">{day.length} khung giờ</span>
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
                    {times.map((time) => (
                        <button
                        key={time}
                        onClick={() => handleTimeClick(time)}
                        className={`border rounded-lg py-2 transition font-medium ${
                            time === selectedTime // Style cho khung giờ đã chọn
                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                : "border-gray-300 hover:bg-blue-500 hover:text-white"
                        }`}
                        >
                        {time}
                        </button>
                    ))}
                    </div>
                </div>
                
                
        </>
    );
}
export default DateSelector;
