import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {doctorsData}  from "../../data/doctorsData";
import { HeartIcon, BadgeCheck,ChevronLeft, ChevronRight, MapPin} from "lucide-react";
import Header from "../Home/Header";
import HomeFooter from "../Home/HomeFooter";
import "../../assets/Booking/DoctorProfile.css";


const DoctorProfile = () => {
    const scrollRef= useRef(null);
    const { id } = useParams();
    const doctor = doctorsData.find((d) => d.id === Number(id));
    const [showFull, setShowFull] = useState (false);
    const MAX_LENGTH = 100; 

    const toggleShow = () => {
        setShowFull(!showFull);
      };
    
    const schedules = Object.keys(doctor.schedules || {});
    const [selectedDay, setSelectedDay] = useState(schedules[0]);

    const times = doctor.schedules[selectedDay] || [];
    if (!doctor) {
        return <div className="p-6 text-center text-gray-500">Không tìm thấy bác sĩ.</div>;
    }

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    };
    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    };

  return (
    <>
        <Header />
        <div className="w-full bg-gray-200 pt-5 pb-10">
            <div className="pb-5 max-w-4xl mx-auto">
                <a href="">Trang chủ /</a>
                <a href=""> Bác sĩ</a>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-6 ">
                <div className="flex items-start pb-4">
                    <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-44 h-44 rounded-full mr-5 object-cover border"
                    />
                    <div className="flex-grow space-y-3">
                    {/* <div className="flex flex-col justify-between items-start"> */}
                        <div className="flex justify-end w-full">
                            <button className="flex items-center px-2 py-1 border rounded-2xl">
                                <HeartIcon className="w-4 h-4 mr-2" />Yêu thích
                            </button>
                        </div>
                        
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">{doctor.name}</h1>
                        </div>
                        <div className="text-blue-600 font-semibold flex items-center ">
                            <div className=" border-r-2 pr-2">
                                <BadgeCheck className="w-4 h-4 text-blue-500 inline-block mr-2 " />Bác Sĩ
                            </div>
                            <span className="text-gray-600 pl-2">{doctor.experienceYear} năm kinh nghiệm</span>
                        </div>
                        <div>
                            <span className="font-normal text-gray-600 text-[200] mr-4">Chuyên khoa:</span>
                            <a href="" className="font-semibold text-blue-600">{doctor.specialty}</a> 
                        </div>
                        {/* <div>
                            <span className="font-normal text-gray-600 text-[200] mr-3">Chức vụ:</span> 
                            <span className="font-semibold"  >{doctor.}</span>
                        </div> */}
                        <div>
                            <span className="font-normal text-gray-600 text-[200] mr-3">Nơi công tác:</span> 
                            <span className="font-semibold"  >{doctor.workplace}</span>
                        </div>
                       
                    </div>
                </div>

                {/* Chọn ngày */}
                <div className="mt-4 ">
                    <h2 className="font-semibold text-lg mb-2">Đặt khám nhanh</h2>
                    <div className="flex items-center relative">
                        <button onClick={scrollLeft}
                            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10">
                            <ChevronLeft size={22}/>
                        </button>
                        <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide pb-1 scroll-smooth space-x-2">

                            {schedules.map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedDay(day)}
                                    className={`flex-shrink-0 px-4 py-2  transition font-semibold relative ${
                                        day === selectedDay
                                        ? "bg-blue-50 "
                                        : " hover:bg-gray-200"
                                    }`}
                                    >
                                    <span className="block text-base">{day}</span>
                                    <span className="block text-sm text-green-500 font-normal">42 khung giờ</span>
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
                        className="border border-gray-300 hover:bg-blue-600 hover:text-white rounded-lg py-2 transition"
                        >
                        {time}
                        </button>
                    ))}
                    </div>
                </div>
                
                <div className="mt-4">
                    <h2 className="font-semibold text-lg py-5">Giới thiệu</h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                    {showFull ? doctor.description : doctor.description.slice(0,MAX_LENGTH)+ "..."}
                    <button
                        onClick={() => setShowFull(!showFull)}
                        className="text-blue-600 ml-1 hover:underline"
                    >
                        {showFull ? "Ẩn bớt" : "Xem thêm"}
                    </button>
                    </p>
                </div>

                <div>
                    <h2 className="font-semibold text-lg py-5">Chuyên khám</h2>
                    <div className="flex flex-col justify-between w-1/2 h-48 bg-gradient-to-r from-blue-600 to-blue-400 text-white p-5 rounded-xl relative overflow-hidden">
                        <div className="flex flex-col space-y-1">
                            <h3 className="font-semibold text-lg flex items-center gap-1">
                            Địa chỉ
                            </h3>
                        </div>
                        <div>
                            <p className="text-lg opacity-95">
                            {doctor.address}
                            </p>
                        </div>
                        <button className="flex items-center gap-2  bg-white text-blue-600 font-medium w-36 px-3 py-1 mt-3 rounded-full text-base shadow hover:bg-blue-50 transition">
                            <MapPin size={18} /> Mở bản đồ
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-lg py-5">Quá trình đào tạo</h2>
                    <ul className="list-disc text-base pl-5 marker:text-gray-400 ml-3 space-y-2">
                        {doctor.trainingProcess.map((process,index) => (
                            <li key={index}>{process}</li>
                        ))}
                    </ul>
                </div>
                <div>
                  <h2 className="font-semibold text-lg py-5">Quá trình đào tạo</h2>
                  <ul className="list-disc text-base pl-5 marker:text-gray-400 ml-3 space-y-2">
                        {doctor.experience.map((exp,index) => (
                            <li key={index}>{exp}</li>
                        ))}
                    </ul>
                </div>

                <hr className="border-1 my-5"/>
                <div className="flex flex-row justify-between">
                    <div className="text-base hover:text-blue-500">
                        <p>Hỗ trợ đặt khám</p>
                        <p className="font-semibold">1900-2805</p>

                    </div>
                    <button className="w-4/5 bg-blue-600 rounded-lg text-white text-lg">
                        ĐẶT KHÁM NGAY
                    </button>
                </div>
            </div>
        </div>
        <HomeFooter />
    </>    
  );
};

export default DoctorProfile;
