import React, { useState , useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronRight, ChevronLeft } from "lucide-react"; 
import Header from "../../components/Home/Header";
import HomeFooter from "../../components/Home/HomeFooter";
import BookingDownloadApp from "../../components/Booking/BookingDownloadApp";
import { clinicService } from "../../api/clinicService";
import { UserService } from "../../api/userService";
import { appointmentService } from "../../api/appointmentService";


const CalendarComponent = ({ onSelectDay, selectedDate, schedules }) => {
    
    // State quản lý thời gian hiển thị (Mặc định là tháng hiện tại)
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const today = new Date();
    const TODAY_DAY = today.getDate();
    const TODAY_MONTH = today.getMonth();
    const TODAY_YEAR = today.getFullYear();

    // Lấy thông tin từ state currentDate (Tháng đang xem)
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    
    // Tính toán số ngày trong tháng đang xem
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Tính ngày đầu tiên của tháng để biết padding
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    let startDayIndex = firstDayOfMonth.getDay();
    if (startDayIndex === 0) {
        startDayIndex = 7; // CN là 7
    }
    const paddingDays = startDayIndex - 1;

    // --- HÀM ĐIỀU HƯỚNG THÁNG ---
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // --- 1. TẠO MAP DỮ LIỆU LỊCH ---
    // Lưu ý: Cần map theo cả ngày/tháng/năm đầy đủ để tránh trùng ngày giữa các tháng
    const dateMap = {};
    Object.keys(schedules || {}).forEach(key => {
        // Giả sử key có dạng "Thứ 5, 27/11/2025"
        // Cần parse chính xác ngày/tháng/năm từ key để so sánh
        const datePart = key.split(', ')[1]; // "27/11/2025"
        if (datePart) {
            const [d, m, y] = datePart.split('/').map(Number);
            
            // Chỉ đưa vào map nếu đúng là tháng/năm đang hiển thị
            if (m === currentMonth + 1 && y === currentYear) {
                const status = schedules[key].length > 0 ? 'AVAILABLE' : 'FULL';
                dateMap[d] = { 
                    status, 
                    scheduleKey: key,
                    count: schedules[key].length 
                };
            }
        }
    });

    // --- 2. XỬ LÝ LƯỚI LỊCH ---
    const calendarGrid = [];
    
    // Padding đầu tháng
    for (let i = 0; i < paddingDays; i++) {
        calendarGrid.push({ day: null });
    }
    
    // Các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
        // Format: dd/mm/yyyy (để so sánh với selectedDate)
        // Lưu ý: Cần format string giống hệt cách bạn lưu selectedDate ở component cha
        const fullDateString = `${day.toString().padStart(2, '0')}/${(currentMonth + 1).toString().padStart(2, '0')}/${currentYear}`;
        
        const data = dateMap[day];
        let status = 'NONE'; 
        if (data) status = data.status;

        // Kiểm tra có phải hôm nay không
        const isToday = day === TODAY_DAY && currentMonth === TODAY_MONTH && currentYear === TODAY_YEAR;

        calendarGrid.push({
            day,
            status,
            fullDateString,
            scheduleKey: data ? data.scheduleKey : null,
            isToday
        });
    }

    // --- 3. LOGIC STYLING ---
    const getDayStyles = (dayData) => {
        if (!dayData.day) return 'bg-white border-none'; // Ẩn border ô trống
        
        // Ưu tiên 1: Đang chọn
        if (selectedDate && selectedDate.includes(dayData.fullDateString)) { 
             // Lưu ý: Logic so sánh string ngày cần chính xác
             return 'bg-blue-600 text-white font-bold shadow-lg transform scale-105 transition-transform';
        }
        
        // Ưu tiên 2: Hôm nay
        if (dayData.isToday) {
            // Nếu hôm nay có lịch -> Màu xanh đậm hơn, nếu không -> Màu xanh nhạt
            return dayData.status === 'AVAILABLE' 
                ? 'bg-blue-100 text-blue-700 font-bold border-2 border-blue-400 cursor-pointer hover:bg-blue-200'
                : 'bg-gray-100 text-gray-600 font-bold border-2 border-gray-300'; 
        }
        
        // Ưu tiên 3: Có lịch (Available)
        if (dayData.status === 'AVAILABLE') {
            return 'text-gray-800 font-bold cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors';
        }

        // Mặc định: Không có lịch / Đầy
        return 'text-gray-300 cursor-default';
    };

    const handleDayClick = (dayData) => {
        if (!dayData.day || dayData.status === 'FULL' || dayData.status === 'NONE') return;
        
        onSelectDay({ 
            date: dayData.fullDateString, 
            scheduleKey: dayData.scheduleKey 
        });
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Thanh điều hướng tháng */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 capitalize">
                    Tháng {currentMonth + 1}, {currentYear}
                </h2>
                <div className="flex items-center space-x-1">
                    <button 
                        onClick={handlePrevMonth}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-blue-600"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={handleNextMonth}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-blue-600"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Lưới lịch */}
            <div className="grid grid-cols-7 text-center border-t border-l border-gray-200 rounded-tl-lg rounded-tr-lg overflow-hidden">
                
                {/* Tên thứ */}
                {weekdays.map((dayName, index) => (
                    <div 
                        key={index} 
                        className={`py-3 text-sm font-semibold border-b border-r border-gray-200 bg-gray-50 ${dayName === 'CN' ? 'text-red-500' : 'text-gray-600'}`}
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
                            className={`h-14 flex items-center justify-center border-b border-r border-gray-200 text-sm ${styles}`}
                            onClick={() => handleDayClick(dayData)}
                        >
                            {dayData.day}
                        </div>
                    );
                })}
            </div>

            {/* Chú thích màu (Giữ nguyên hoặc cập nhật nếu cần) */}
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600">
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-gray-800 rounded-full mr-2"></span>
                    Ngày có lịch
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-100 border border-blue-400 rounded-full mr-2"></span>
                    Hôm nay
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                    Đang chọn
                </div>
                 <div className="flex items-center">
                    <span className="w-3 h-3 bg-gray-200 rounded-full mr-2"></span>
                    Không có lịch
                </div>
            </div>
        </div>
    );
};



const TimeSlotSelector = ({ times, onSelectTime, selectedTime }) => {
    
    // Nếu times là undefined/null, khởi tạo mảng rỗng để tránh lỗi map
    const timeSlots = times || []; 

    // Hàm phân loại giờ (Đơn giản: Chia trước 12h là Sáng, sau 12h là Chiều)
    const categorizeTime = (timeString) => {
        // timeString: "08:00 - 08:15"
        const startTime = parseInt(timeString.split('-')[0].trim().split(':')[0]);
        if (startTime < 12) {
            return 'Sáng';
        } else {
            return 'Chiều';
        }
    };
    
    const groupedTimes = timeSlots.reduce((acc, slot) => {
        const category = categorizeTime(slot.time);
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(slot);
        return acc;
    }, {});


    const renderTimeButtons = (slots) => (
        <div className="grid grid-cols-6 gap-2">
            {slots.map(slot => (
                <button
                    key={slot.id} 
                    onClick={() =>{onSelectTime(slot)
                        console.log("khung giờ đã chọn ID:", slot.id); 
                        console.log("khung giờ đã chọn TIME:", slot.time)}  }
                    className={`border rounded-lg py-3 transition text-sm font-medium ${
                        // So sánh theo chuỗi giờ (time) hoặc ID, tùy thuộc selectedTime là gì
                        selectedTime === slot.time 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                            : 'border-gray-300 hover:bg-blue-500 hover:text-white'
                    }`}
                >
                    {slot.time}
                </button>
            ))}
        </div>
    );
    

    return (
        <div className="mt-4">
            
            {/* Kiểm tra nếu không có khung giờ nào */}
            {timeSlots.length === 0 && (
                <p className="text-gray-500">Không có khung giờ trống cho ngày này.</p>
            )}

            {/* Render Buổi Sáng */}
            {groupedTimes['Sáng'] && (
                <div>
                    <p className="font-semibold text-gray-700 mb-2">🌤️ Buổi sáng</p>
                    {renderTimeButtons(groupedTimes['Sáng'])}
                </div>
            )}

            {/* Render Buổi Chiều */}
            {groupedTimes['Chiều'] && (
                <div className={groupedTimes['Sáng'] ? "mt-4" : ""}>
                    <p className="font-semibold text-gray-700 mb-2">☀️ Buổi chiều</p>
                    {renderTimeButtons(groupedTimes['Chiều'])}
                </div>
            )}
        </div>
    );
};

const CompleteBookingClinic = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [clinic, setClinic] = useState(null);
    const [patient, setPatient] = useState(null);
    const [schedules, setSchedules] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedMaGio, setSelectedMaGio] = useState(null);
    const [noteContent, setNoteContent] = useState(''); 
    const [currentStep, setCurrentStep] = useState(1); 
    const [selectedScheduleKey, setSelectedScheduleKey] = useState(null);
    
    useEffect(() => {
        const fetchClinicAndPatientData = async () => {
            try {
                setLoading(true);
                setError(null);
                const clinicInfo = await clinicService.getClinicById(id);
                if (!clinicInfo) {
                    setError("Không tìm thấy dữ liệu phòng khám với ID này.");
                    return;
                }
                setClinic(clinicInfo);

                const schedulesData= await clinicService.getClinicSchedules(id);
                console.log("Lịch làm việc của phòng khám: ", schedulesData);
                setSchedules(schedulesData);

                const patientData = await UserService.getUserCurrent();
                setPatient(patientData);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu phòng khám hoặc bệnh nhân:", err);
                setError("Không thể tải dữ liệu từ server.");
            } finally {
                setLoading(false);
            }
        };
        fetchClinicAndPatientData();
    }, [id]);
    if (!clinic || !patient) {
        return <div className="p-6 text-center text-gray-500">Đang tải dữ liệu...</div>;
    }
    const patientDetails = patient ? {
        name: patient.fullName, 
        dob: patient.dob,
        gender: patient.gender,
        address: patient.address,
    } : null;

    const handleDaySelect = ({ date, scheduleKey }) => { 
        setSelectedDate(date);
        setSelectedScheduleKey(scheduleKey); 
        setSelectedTime(null); 
        
        setCurrentStep(2); 
    };
    
    
    const handleTimeSelect = (time) => {
        setSelectedTime(time.time);
        setSelectedMaGio(time.id);
        setCurrentStep(3); 
    };

    const handleToggle = (targetStep) => {
        if (currentStep > targetStep) {
            setCurrentStep(targetStep);
        }
    };
    
    const handleBooking =async () => {
        if (!isReadyToBook || !patientDetails) return;
        const patientDetailsWithNote = { ...patientDetails, note: noteContent };

        const bookingData = {
            maGio: selectedMaGio, 
            userId: patient.id, 
            ghiChu: noteContent,
        };

        try{
            const response =await appointmentService.bookClinicAppointment(bookingData);

            const successData = {
            
                mainName: clinic.name,    
                mainAddress: clinic.address, // Địa chỉ Phòng khám
                mainImage: clinic.image,  // Ảnh Phòng khám
            
                code: `YMA${Math.floor(Math.random() * 1000000)}`, 
                date: selectedDate, 
                time: selectedTime, 
                patient: patientDetailsWithNote
            };
             navigate(`/dat-kham/phieu-kham`, { state: successData });

        }catch(error){
            console.error("Lỗi đặt khám:", error);
            alert("Đặt khám thất bại. Vui lòng thử lại sau.");
        }
        
        
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
                                    <CalendarComponent onSelectDay={handleDaySelect} selectedDate={selectedDate} schedules={schedules}/> 
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
                                    times={schedules[selectedScheduleKey]|| []}
                                    onSelectTime={handleTimeSelect} 
                                    selectedTime={selectedTime}/>
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
                                        <div className="font-semibold">{patientDetails.name}</div>
                                        <div className="text-sm text-gray-600">{patientDetails.dob}</div>
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
                                        <span className="font-semibold text-gray-800">{patientDetails.name}</span>
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