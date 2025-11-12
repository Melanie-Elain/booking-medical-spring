import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronRight, ChevronLeft } from "lucide-react"; 
import Header from "../../components/Home/Header";
import HomeFooter from "../../components/Home/HomeFooter";
import BookingDownloadApp from "../../components/Booking/BookingDownloadApp";
import clinicsData from "../../data/clinicsData"; 
const CalendarComponent = ({ onSelectDay, selectedDate, schedules }) => {
    
    // Giả định ngày hôm nay là Thứ Hai, 10/11/2025
    const TODAY_DAY = 10;
    const THIS_MONTH = 11;
    const THIS_YEAR = 2025;
    const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    
    
    const START_DAY_OF_MONTH = 1; 
    const PADDING_DAYS = 5; // Số ô trống trước ngày 1 (T7 = 6, T2 = 1. T7 là ngày đầu, nên cần 5 ô trống)
    const DAYS_IN_MONTH = 30;

    // --- 1. PHÂN TÍCH DỮ LIỆU SCHEDULES ---
    const dateMap = {};
    Object.keys(schedules || {}).forEach(key => {
        // Ví dụ key: "Th 2, 03-11"
        const dayMatch = key.match(/(\d{2})-\d{2}$/); // Lấy ngày (vd: 03)
        
        if (dayMatch) {
            const dayOfMonth = parseInt(dayMatch[1]);
            const status = schedules[key].length > 0 ? 'AVAILABLE' : 'FULL';
            
            dateMap[dayOfMonth] = { 
                status, 
                scheduleKey: key,
                count: schedules[key].length // Số lượng khung giờ còn lại
            };
        }
    });


    // --- 2. XỬ LÝ LƯỚI LỊCH ---
    const calendarGrid = [];
    
    // Thêm các ô trống đầu tiên (Padding)
    for (let i = 0; i < PADDING_DAYS; i++) {
        calendarGrid.push({ day: null });
    }
    
    // Thêm các ngày trong tháng
    for (let day = 1; day <= DAYS_IN_MONTH; day++) {
        const fullDateString = `${day}/${THIS_MONTH}/${THIS_YEAR}`;
        const data = dateMap[day];
        
        let status = 'NONE'; // Mặc định không có trong schedules
        if (data) status = data.status;

        calendarGrid.push({
            day,
            status,
            fullDateString,
            scheduleKey: data ? data.scheduleKey : null,
            isToday: day === TODAY_DAY
        });
    }

    // --- 3. LOGIC STYLING ---
    const getDayStyles = (dayData) => {
        if (!dayData.day) return 'bg-white';
        
        // Ngày đang chọn
        if (selectedDate === dayData.fullDateString) {
            return 'bg-blue-600 text-white font-bold shadow-lg';
        }
        
        // Ngày hôm nay
        if (dayData.isToday) {
            return 'bg-blue-100 text-blue-600 font-semibold cursor-pointer hover:bg-blue-200';
        }
        
        // Ngày có sẵn
        if (dayData.status === 'AVAILABLE') {
            return 'text-gray-800 font-semibold cursor-pointer hover:bg-gray-100';
        }

        // Ngày đã đầy / Không có lịch
        return 'text-gray-400 cursor-not-allowed';
    };

    const handleDayClick = (dayData) => {
        if (!dayData.day || dayData.status === 'FULL' || dayData.status === 'NONE') return;
        
        // Gửi ngày và key schedule lên component cha
        onSelectDay({ 
            date: dayData.fullDateString, 
            scheduleKey: dayData.scheduleKey 
        });
    };

    return (
        <div className="p-6 bg-white rounded-lg">
            {/* Thanh điều hướng tháng */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tháng 11 {THIS_YEAR}</h2>
                <div className="flex items-center space-x-2 text-gray-600">
                    <ChevronLeft size={20} className="cursor-pointer hover:text-blue-600" />
                    <ChevronRight size={20} className="cursor-pointer hover:text-blue-600" />
                </div>
            </div>

            {/* Lưới lịch */}
            <div className="grid grid-cols-7 text-center border-t border-l border-gray-300">
                
                {/* Tên thứ */}
                {weekdays.map((dayName, index) => (
                    <div 
                        key={index} 
                        className={`py-2 text-sm font-medium border-b border-r border-gray-300 ${dayName === 'CN' ? 'text-red-500' : 'text-gray-600'}`}
                    >
                        {dayName}
                    </div>
                ))}

                {/* Các ô ngày */}
                {calendarGrid.map((dayData, index) => {
                    const styles = getDayStyles(dayData);
                    
                    return (
                        <div
                            key={index}
                            className={`h-12 flex items-center justify-center border-b border-r border-gray-300 ${styles}`}
                            onClick={() => handleDayClick(dayData)}
                        >
                            {dayData.day}
                        </div>
                    );
                })}
            </div>

            {/* Chú thích màu */}
            {/* Cần cập nhật chú thích màu chính xác theo logic status mới */}
            <div className="flex justify-start space-x-6 mt-6 text-sm text-gray-700">
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-gray-800 rounded-full mr-1"></span>
                    Ngày có thể đặt
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-100 border border-blue-400 rounded-full mr-1"></span>
                    Hôm nay
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-600 rounded-full mr-1"></span>
                    Ngày đang chọn
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                    Ngày đã đầy lịch
                </div>
            </div>
        </div>
    );
};


const TimeSlotSelector = ({ onSelectTime, selectedTime }) => {
    // Khung giờ giả định
    const mockTimeSlots = ["16:50-17:00", "17:00-17:10", "17:10-17:20", "17:20-17:30", "17:30-17:40", "17:40-17:50"];
    
    return (
        <div className="mt-4">
            <p className="font-semibold text-gray-700 mb-2">☀️ Buổi chiều</p>
            <div className="grid grid-cols-6 gap-2">
                {mockTimeSlots.map(time => (
                    <button
                        key={time}
                        onClick={() => onSelectTime(time)}
                        className={`border rounded-lg py-3 transition text-sm font-medium ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'border-gray-300 hover:bg-blue-500 hover:text-white'}`}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );
};

const CompleteBookingClinic = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const clinic = clinicsData.find(c => c.id === Number(id));
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [noteContent, setNoteContent] = useState(''); 
    const [currentStep, setCurrentStep] = useState(1); 
    const [selectedScheduleKey, setSelectedScheduleKey] = useState(null);
    
    
    const patientDetails = {
        name: "Thanh Hằng", 
        dob: "04/01/2004",
        gender: "Nữ",
        address: "Xã Phước Kiển, Huyện Nhà Bè, Hồ Chí Minh",
    };
    const patientName = patientDetails.name; 

    const handleDaySelect = ({ date, scheduleKey }) => { 
        setSelectedDate(date);
        setSelectedScheduleKey(scheduleKey); // <<< LƯU KEY LẠI
        setSelectedTime(null); 
        
        setCurrentStep(2); // Chuyển sang Bước 2
    };
    
    
    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setCurrentStep(3); 
    };

    const handleToggle = (targetStep) => {
        if (currentStep > targetStep) {
            setCurrentStep(targetStep);
        }
    };
    
    const handleBooking = () => {
        const patientDetailsWithNote = { ...patientDetails, note: noteContent };

        const successData = {
            
            // Trường thống nhất
            mainName: clinic.name,    // Tên Phòng khám
            mainAddress: clinic.address, // Địa chỉ Phòng khám
            mainImage: clinic.image,  // Ảnh Phòng khám
        
            // ... (các trường đặt lịch và bệnh nhân khác)
            stt: 5, 
            code: `YMA${Math.floor(Math.random() * 1000000)}`, 
            date: selectedDate, 
            time: selectedTime, 
            patient: patientDetailsWithNote
        };
        
        navigate(`/dat-kham/phieu-kham`, { state: successData });
    };

    const isReadyToBook = selectedDate && selectedTime && currentStep === 3;

    return (
        <>
            <Header />
            <div className=" bg-gray-100 p-8 ">
                
                <div className="flex items-center space-x-4 max-w-6xl justify-start mx-auto mb-8">
                    
                    <div className="flex items-center space-x-2">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-white ${currentStep > 1 ? 'bg-blue-500' : 'bg-blue-600'}`}>
                            {currentStep > 1 ? <Check size={18} /> : 1}
                        </div>
                        <span className={`${currentStep > 1 ? 'text-blue-500' : 'text-gray-800 font-semibold'}`}>Ngày khám</span>
                    </div>

                    <div className="h-0.5 w-8 bg-gray-300"></div>
                    
                    <div className="flex items-center space-x-2">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold ${currentStep > 2 ? 'bg-blue-500 text-white' : (currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700')}`}>
                            {currentStep > 2 ? <Check size={18} /> : 2}
                        </div>
                        <span className={`${currentStep > 2 ? 'text-blue-500' : (currentStep >= 2 ? 'text-gray-800 font-semibold' : 'text-gray-400')}`}>Giờ khám</span>
                    </div>
                    
                    <div className="h-0.5 w-8 bg-gray-300"></div>

                    <div className="flex items-center space-x-2">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold ${currentStep >= 3 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                            3
                        </div>
                        <span className={`${currentStep >= 3 ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>Bệnh nhân</span>
                    </div>

                </div>
                {/* --- */}
                
                <div className="flex flex-row space-x-10 max-w-7xl justify-between mx-auto mt-4">
                    
                    <div className="w-2/3">
                        
                        <div className={`p-6 rounded-lg shadow bg-white mb-5`}>
                            <div 
                                className={`flex items-center justify-between cursor-pointer ${currentStep > 1 ? 'hover:bg-gray-50 p-2 -m-2 rounded' : ''}`}
                                onClick={() => handleToggle(1)} 
                            >
                                <h3 className={`font-semibold text-base flex items-center ${currentStep === 1 ? 'text-blue-600' : 'text-gray-800'}`}>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 ${currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-400 text-gray-700'}`}>1</span>
                                    Ngày khám
                                </h3>
                                {currentStep > 1 && (
                                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${currentStep !== 1 ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </div>
                            {currentStep === 1 && (
                                <div className="mt-4">
                                    <CalendarComponent onSelectDay={handleDaySelect} selectedDate={selectedDate} schedules={clinic.schedules}/> 
                                </div>
                            )}
                        </div>
                        
                        {/* 2. GIỜ KHÁM */}
                        <div className={`p-6 rounded-lg shadow bg-white ${currentStep < 2 ? 'hidden' : 'block'} mb-5`}>
                            <div 
                                className={`flex items-center justify-between cursor-pointer ${currentStep > 2 ? 'hover:bg-gray-50 p-2 -m-2 rounded' : ''}`}
                                onClick={() => handleToggle(2)}
                            >
                                <h3 className={`font-semibold text-base flex items-center ${currentStep === 2 ? 'text-blue-600' : 'text-gray-800'}`}>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 ${currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-400 text-gray-700'}`}>2</span>
                                    Giờ khám
                                </h3>
                                {/* Mũi tên thu gọn */}
                                {currentStep > 2 && (
                                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${currentStep !== 2 ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </div>
                            {/* Nội dung Giờ khám */}
                            {currentStep === 2 && (
                                <div className="mt-4">
                                    <TimeSlotSelector 
                                    schedules={clinic.schedules} 
                                    selectedScheduleKey={selectedScheduleKey} 
                                    onSelectTime={handleTimeSelect} 
                                    selectedTime={selectedTime} />
                                </div>
                            )}
                        </div>

                        {/* 3. BỆNH NHÂN */}
                        <div className={`p-6 rounded-lg shadow bg-white ${currentStep < 3 ? 'hidden' : 'block'}`}>
                            <div className={`flex items-center justify-between cursor-pointer`}>
                                <h3 className={`font-semibold text-base flex items-center text-blue-600`}>
                                    <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 bg-blue-600 text-white">3</span>
                                    Bệnh nhân
                                </h3>
                            </div>
                            {/* Nội dung form Hồ sơ bệnh nhân */}
                            {currentStep === 3 && (
                                <div className="space-y-4 mt-4"> 
                                    <div className="border border-blue-400 p-4 rounded-lg bg-blue-50">
                                        <div className="font-semibold">{patientName}</div>
                                        <div className="text-sm text-gray-600">04/01/2004</div>
                                    </div>
                                    {/* Ghi chú */}
                                    <div className="mt-6">
                                        <label className="font-medium text-sm text-gray-700">Thông tin bổ sung (không bắt buộc)</label>
                                        <textarea 
                                            className="w-full border p-2 rounded mt-1" 
                                            rows="3" 
                                            placeholder="Triệu chứng, thuốc đang dùng, tiền sử, ..."
                                            value={noteContent}
                                            onChange={(e) => setNoteContent(e.target.value)}
                                        ></textarea>
                                    </div>
                                    
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* KHỐI BÊN PHẢI (Thông tin đặt khám) */}
                    <div className="w-1/3 min-w-[300px] bg-white rounded-lg shadow h-fit">
                        <div className="p-4 w-full border-b">
                            <h2 className="font-semibold text-lg">Thông tin đặt khám</h2>
                        </div>
                        
                        {/* Thông tin Phòng khám/Bác sĩ */}
                        <div className="p-4 flex flex-col border-b">
                            <div className="flex items-center mb-2">
                                <img src={clinic.image} alt="avatar" className="w-12 h-12 rounded-full mr-2"/>
                                <div>
                                    <div className="font-semibold text-gray-800">{clinic.name}</div>
                                    <div className="text-xs text-gray-600">{clinic.address}</div>
                                </div>
                            </div>
                            <div className="font-medium text-sm mt-1">BS. {clinic.doctorName}</div>
                        </div>

                        {/* Chi tiết Ngày/Giờ/Bệnh nhân */}
                        {selectedDate ? (
                            <div className="p-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Ngày khám:</span>
                                    <span className="font-semibold text-gray-800">{selectedDate || '---'}</span> 
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Giờ khám:</span>
                                    <span className="font-semibold text-gray-800">{selectedTime || '---'}</span> 
                                </div>
                                {currentStep === 3 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Bệnh nhân:</span>
                                        <span className="font-semibold text-gray-800">{patientName}</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-4">
                                <button className="bg-gray-300 text-gray-700 w-full py-3 rounded cursor-not-allowed font-semibold" disabled>
                                    Xác nhận đặt khám
                                </button>
                            </div>
                        )}
                        
                        {currentStep === 3 && (
                            <button
                                onClick={handleBooking} 
                                className={`mx-4 mb-4 py-3 rounded font-semibold transition w-[calc(100%-32px)] ${
                                    isReadyToBook
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                }`}
                                disabled={!isReadyToBook}
                            >
                                Đặt lịch
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <BookingDownloadApp />
            <HomeFooter />
        </>      
    );
}

export default CompleteBookingClinic;