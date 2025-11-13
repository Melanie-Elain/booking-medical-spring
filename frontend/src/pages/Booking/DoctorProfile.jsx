import React, { useRef, useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HeartIcon, BadgeCheck,ChevronLeft, ChevronRight, MapPin} from "lucide-react";
import Header from "../../components/Home/Header";
import HomeFooter from "../../components/Home/HomeFooter";
import "../../assets/Booking/DoctorProfile.css";
import { DoctorService } from "../../api/DoctorService";


const DoctorProfile = () => {
    const scrollRef = useRef(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [schedulesData, setSchedulesData] = useState({}); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [showFull, setShowFull] = useState(false);
    const MAX_LENGTH = 100; 
    const [selectedDay, setSelectedDay] = useState(null);

   
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        const fetchDoctorData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const doctorInfo = await DoctorService.getDoctorById(id);
                setDoctor(doctorInfo);

                const schedules = await DoctorService.getDoctorSchedules(id);
                setSchedulesData(schedules);

                const firstDay = Object.keys(schedules)[0];
                if (firstDay) {
                    setSelectedDay(firstDay);
                }
                
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu bác sĩ:", err);
                const errorMessage = err.response?.data?.message || err.message || "Không thể tải thông tin bác sĩ từ server.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDoctorData();
        }
        
    }, [id]);

    
    const toggleShow = () => {
        setShowFull(!showFull);
    };

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    };

   

    if (loading) {
        return (
            <div className="p-6 text-center text-blue-600">Đang tải thông tin bác sĩ...</div>
        );
    }
    
    if (error) {
        return (
            <div className="p-6 text-center text-red-600">Lỗi: {error}</div>
        );
    }

    if (!doctor) {
        return <div className="p-6 text-center text-gray-500">Không tìm thấy bác sĩ.</div>;
    }

   
    const schedules = Object.keys(schedulesData); 
    
    const times = schedulesData[selectedDay] || [];
    const hasSchedules = schedules.length > 0;

  return (
    <>
        <Header />
        <div className="w-full bg-gray-200 pt-5 pb-10">
            <div className="pb-5 max-w-4xl mx-auto">
                <a href="/dat-kham"
               >Trang chủ /</a>
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

                { hasSchedules ? (
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
                                        onClick={() => setSelectedDay(day)}
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

                        <div className="mt-6">
                            <h2 className="font-semibold text-lg mb-2">Chọn khung giờ</h2>
                            <div className="grid grid-cols-6 gap-2">
                            {times.map((time) => (
                                <button
                                key={time.id}
                                className="border border-gray-300 hover:bg-blue-600 hover:text-white rounded-lg py-2 transition"
                                >
                                {time.time}
                                </button>
                            ))}
                            </div>
                        </div>
                    </>
                ): (
                    <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                        <p>Hiện tại bác sĩ chưa có lịch khám. Vui lòng liên hệ tổng đài hỗ trợ để được tư vấn thêm.</p>
                    </div>
                )}
                
                
                <div className="mt-4">
                    <h2 className="font-semibold text-lg py-5">Giới thiệu</h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                        {/* 1. Đảm bảo doctor.description tồn tại trước khi dùng length/slice */}
                        {doctor.description && (
                            <>
                                {/* HIỂN THỊ NỘI DUNG DÀI hoặc NGẮN */}
                                {
                                    doctor.description.length <= MAX_LENGTH || showFull
                                        ? doctor.description
                                        : doctor.description.slice(0, MAX_LENGTH) + "..."
                                }

                                {/* 2. CHỈ HIỂN THỊ NÚT NẾU NỘI DUNG DÀI HƠN MAX_LENGTH */}
                                {doctor.description.length > MAX_LENGTH && (
                                    <button
                                        onClick={toggleShow} // Giả sử hàm toggleShow đã được định nghĩa ở trên
                                        className="text-blue-600 ml-1 hover:underline"
                                    >
                                        {showFull ? "Ẩn bớt" : "Xem thêm"}
                                    </button>
                                )}
                            </>
                        )}
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
                        {doctor.trainingProcess?.map((process,index) => (
                            <li key={index}>{process}</li>
                        ))}
                    </ul>
                </div>
                <div>
                  <h2 className="font-semibold text-lg py-5">Kinh nghiệm làm việc</h2>
                  <ul className="list-disc text-base pl-5 marker:text-gray-400 ml-3 space-y-2">
                        {doctor.experience?.map((exp,index) => (
                            <li key={index}>{exp}</li>
                        ))}
                    </ul>
                </div>

                <hr className="border-1 my-5"/>
                <div className="flex flex-row justify-between">
                    <div className="text-base hover:text-blue-500 hover:cursor-pointer">
                        <p>Hỗ trợ đặt khám</p>
                        <p className="font-semibold">1900-2805</p>

                    </div>
                    <button className="w-4/5 bg-blue-600 rounded-lg text-white text-lg"
                        onClick={() => navigate(`/dat-kham/bac-si/${doctor.id}/hoan-tat-dat-kham`)}
                    >
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
