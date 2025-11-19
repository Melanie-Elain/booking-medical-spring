import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronRight, ChevronLeft } from "lucide-react"; 
import Header from "../../components/Home/Header";
import HomeFooter from "../../components/Home/HomeFooter";
import BookingDownloadApp from "../../components/Booking/BookingDownloadApp";
import { HospitalService } from "../../api/hospitalService";
import { UserService } from "../../api/userService";
import { appointmentService } from "../../api/appointmentService";

const OptionBox = ({ id, label, price, description, isChecked, onChange }) => {
    const formatPrice = (p) => {
        if (p === 0) return '0đ';
        return p.toLocaleString('vi-VN') + 'đ';
    };

    // Giá trị mặc định nếu price không tồn tại (cho Specialty)
    const priceDisplay = price !== undefined ? formatPrice(price) : null;
    const isSpecialty = price === undefined; // Nếu không có price là Specialty

    return (
        <label 
            htmlFor={id} 
            className={`
                block p-4 border rounded-lg cursor-pointer transition 
                ${isChecked 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-300 hover:border-blue-300 bg-white'
                }
                ${description ? 'mb-4' : 'mb-2'}
            `}
        >
            <div className="flex justify-between items-start">
                <span className="font-semibold text-gray-800 flex-grow">{label}</span>
                
                {priceDisplay && (
                    <span className={`font-bold ml-4 ${isChecked ? 'text-blue-600' : 'text-gray-800'}`}>
                        {priceDisplay}
                    </span>
                )}
                
                {/* Nút Radio Button tùy chỉnh */}
                <input
                    type="radio"
                    id={id}
                    name={isSpecialty ? "specialtyOption" : "bookingOption"}
                    checked={isChecked}
                    onChange={() => onChange(id)}
                    className="
                        w-5 h-5 ml-2 mt-0.5 appearance-none rounded-full border-2 
                        transition duration-150 ease-in-out cursor-pointer
                        checked:bg-blue-600 checked:border-blue-600 border-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                    "
                />
            </div>
            
            {description && (
                <div className="mt-2 pt-2 border-t border-gray-200 text-sm text-gray-600 leading-relaxed">
                    {description}
                </div>
            )}
        </label>
    );
};

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
        if (!dayData.day) return 'bg-white cursor-default'; // Ô trống (padding)

        // Đang chọn
        if (selectedDate && selectedDate.includes(dayData.fullDateString)) { 
             return 'bg-blue-600 text-white font-bold hover:bg-blue-700';
        }
        
        // Có lịch
        if (dayData.status === 'AVAILABLE') {
            if (dayData.isToday) return 'bg-blue-50 text-blue-700 font-bold hover:bg-blue-100'; // Hôm nay có lịch
            return 'bg-white text-gray-900 font-bold hover:bg-blue-50 cursor-pointer'; // Ngày thường có lịch
        }

        // Hôm nay nhưng không có lịch
        if (dayData.isToday) {
             return 'bg-yellow-50 text-yellow-700 font-semibold';
        }

        // Không có lịch
        return 'bg-white text-gray-300 cursor-default';
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


// const TimeSlotSelector = ({times,  onSelectTime, selectedTime }) => {
    
//     const timeSlots = times || [];

//     return (
//         <div className="mt-4">
//             <p className="font-semibold text-gray-700 mb-2">☀️ Buổi chiều</p>
//             <div className="grid grid-cols-6 gap-2">
//                 {mockTimeSlots.map(time => (
//                     <button
//                         key={time}
//                         onClick={() => onSelectTime(time)}
//                         className={`border rounded-lg py-3 transition text-sm font-medium ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'border-gray-300 hover:bg-blue-500 hover:text-white'}`}
//                     >
//                         {time}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

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

const CompleteBookingHospital = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    

    const [selectedOption, setSelectedOption] = useState(null); 
    const [selectedSpecialty, setSelectedSpecialty] = useState(null); 


    const [hospital, setHospital] = useState(null);
    const [patient, setPatient] = useState(null);
    const [schedules,setSchedules]= useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedMaGio, setSelectedMaGio] = useState(null);
    const [noteContent, setNoteContent] = useState(''); 
    const [currentStep, setCurrentStep] = useState(1); 
    const [selectedScheduleKey, setSelectedScheduleKey] = useState(null);
    
    React.useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                setLoading(true);

                const hospitalsData=await HospitalService.getHospitalById(id);
                setHospital(hospitalsData);
                setLoading(false);
                console.log("Thông tin bệnh viện:",hospitalsData);


                const schedulesData =await HospitalService.getHospitalSchedules(id);
                setSchedules(schedulesData);
                console.log("Lịch làm việc bệnh viện:",schedulesData);
                
                const patientData=await UserService.getUserCurrent();
                setPatient(patientData);

                console.log("Thông tin bệnh nhân:",patientData);

            } catch (err) {
                setError('Không thể tải thông tin bệnh viện.');
                setLoading(false);
            }
        };
        fetchHospitalData();
    }, [id]);
    if (loading) {
        return <div className="text-center mt-20 text-gray-500">Đang tải thông tin bệnh viện...</div>;
    }
    if (error) {
        return <div className="text-center mt-20 text-red-500">{error}</div>;
    }


    const patientDetails = patient ? {
        name: patient.fullName, 
        dob: patient.dob,
        gender: patient.gender,
        address: patient.address,
        note: noteContent,
    } : null;


    // const patientName = patientDetails.name; 

    const handleOptionSelect = (optionId) => {
        setSelectedOption(optionId);
        setCurrentStep(2); 
    };

    const handleSpecialtySelect = (specialty) => {
        setSelectedSpecialty(specialty);
        setCurrentStep(3); 
    };

    const handleDaySelect = ({ date, scheduleKey }) => { 
        setSelectedDate(date);
        setSelectedScheduleKey(scheduleKey);
        setSelectedTime(null); 
        setCurrentStep(4); 
    };
    
    const handleTimeSelect = (time) => {
        setSelectedTime(time.time);
        setSelectedMaGio(time.id);
        setCurrentStep(5); 
    };

    const handleToggle = (targetStep) => {
        if (currentStep > targetStep) {
            setCurrentStep(targetStep);
        }
    };
    
    const handleBooking = async () => {
    
        if (!isReadyToBook || !patient) return; 
    
        const selectedOptionData = examOptions.find(o => o.id === selectedOption);
        const isKhamThuong = selectedOptionData && selectedOptionData.id === 'thuong';
        
        const bookingPayload = { 
            maGio: selectedMaGio, 
            userId: patient.id, 
            ghiChu: noteContent,
            
            examType: selectedOption, 
            finalPrice: selectedOptionData?.price || 0,
            entityType: 'BENHVIEN', 
        };
        if (isKhamThuong) {
            
            navigate(`/payment/select-method`, { 
                state: { 
                    bookingPayload, 
                    redirectPath: '/dat-kham/phieu-kham',
                    hospital: hospital 
                } 
            });
    
        } else {
            
            try {
                const response = await appointmentService.bookHospitalAppointment(bookingPayload); 
                const bookedAppointment = response;
                
                const successData = {
                    mainName: hospital.name, 
                    mainAddress: hospital.address, 
                    mainImage: hospital.image, 
                    stt: bookedAppointment.trangThai || 'Đang chờ', 
                    code: bookedAppointment.maLichHen, 
                    date: selectedDate, 
                    time: selectedTime, 
                    patient: patientDetails
                };
                
                navigate(`/dat-kham/phieu-kham`, { state: successData });
                
            } catch (err) {
                console.error("Lỗi đặt lịch:", err);
                alert("Đặt khám thất bại: Khung giờ đã đầy hoặc lỗi hệ thống.");
            }
        }
    };

    const isReadyToBook = selectedDate && selectedTime && currentStep === 5; 

    const examOptions = [
        { id: 'thuong', label: 'Khám Thường', price: 50600, description: null },
        { id: 'bhyt', label: 'Khám BHYT', price: 0, description: 'Bệnh nhân đủ điều kiện hướng BHYT phải: – Có giấy chuyển tuyến hoặc phiếu hẹn tái khám hợp lệ – Bản chính CMND/CCCD, bằng lái xe,...' },
    ];

    const specialties = hospital.specialties 
        ? hospital.specialties.map(specObject => ({
            id: (specObject.name || '').toLowerCase().replace(/\s/g, '_'),
            label: specObject.name 
        })) 
        : [];

    const getSelectedOptionLabel = (id) => examOptions.find(o => o.id === id)?.label || 'Chưa chọn';
    const getSelectedSpecialtyLabel = (id) => specialties.find(s => s.id === id)?.label || 'Chưa chọn';

    return (
        <>
            <Header />
            <div className=" bg-gray-100 p-8 ">
                
                {/* THANH TIẾN TRÌNH 5 BƯỚC MỚI */}
                <div className="flex items-center space-x-2 max-w-6xl justify-start mx-auto mb-8 text-sm">
                    
                    {/* BƯỚC 1: Loại hình khám */}
                    <div className="flex items-center space-x-1">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-white ${currentStep > 1 ? 'bg-blue-500' : 'bg-blue-600'}`}>
                            {currentStep > 1 ? <Check size={14} /> : 1}
                        </div>
                        <span className={`${currentStep > 1 ? 'text-blue-500' : 'text-gray-800'}`}>Loại hình</span>
                    </div>
                    <div className="h-0.5 w-4 bg-gray-300"></div>

                    {/* BƯỚC 2: Chuyên khoa */}
                    <div className="flex items-center space-x-1">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold ${currentStep > 2 ? 'bg-blue-500 text-white' : (currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700')}`}>
                            {currentStep > 2 ? <Check size={14} /> : 2}
                        </div>
                        <span className={`${currentStep > 2 ? 'text-blue-500' : (currentStep >= 2 ? 'text-gray-800' : 'text-gray-400')}`}>Chuyên khoa</span>
                    </div>
                    <div className="h-0.5 w-4 bg-gray-300"></div>
                    
                    {/* BƯỚC 3: Ngày khám */}
                    <div className="flex items-center space-x-1">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold ${currentStep > 3 ? 'bg-blue-500 text-white' : (currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700')}`}>
                            {currentStep > 3 ? <Check size={14} /> : 3}
                        </div>
                        <span className={`${currentStep > 3 ? 'text-blue-500' : (currentStep >= 3 ? 'text-gray-800' : 'text-gray-400')}`}>Ngày khám</span>
                    </div>
                    <div className="h-0.5 w-4 bg-gray-300"></div>

                    {/* BƯỚC 4: Giờ khám */}
                    <div className="flex items-center space-x-1">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold ${currentStep > 4 ? 'bg-blue-500 text-white' : (currentStep === 4 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700')}`}>
                            {currentStep > 4 ? <Check size={14} /> : 4}
                        </div>
                        <span className={`${currentStep > 4 ? 'text-blue-500' : (currentStep >= 4 ? 'text-gray-800' : 'text-gray-400')}`}>Giờ khám</span>
                    </div>
                    <div className="h-0.5 w-4 bg-gray-300"></div>

                    {/* BƯỚC 5: Bệnh nhân */}
                    <div className="flex items-center space-x-1">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold ${currentStep >= 5 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                            5
                        </div>
                        <span className={`${currentStep >= 5 ? 'text-gray-800' : 'text-gray-400'}`}>Bệnh nhân</span>
                    </div>
                </div>
                {/* --- */}
                
                <div className="flex flex-row space-x-10 max-w-7xl justify-between mx-auto mt-4">
                    
                    {/* KHỐI BÊN TRÁI: Form nhập liệu */}
                    <div className="w-2/3">
                        
                        {/* 1. LOẠI HÌNH KHÁM */}
                        <div className={`p-6 rounded-lg shadow bg-white ${currentStep !== 1 ? 'hidden' : 'block'} mb-5`}>
                            <div className="flex items-center justify-between cursor-pointer">
                                <h3 className="font-semibold text-base flex items-center text-blue-600">
                                    <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 bg-blue-600 text-white">1</span>
                                    Loại hình khám
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 mb-4">Chọn loại hình khám...</p>
                            <div className="space-y-4">
                                {examOptions.map(option => (
                                    <OptionBox
                                        key={option.id}
                                        id={option.id}
                                        label={option.label}
                                        price={option.price}
                                        description={option.description}
                                        isChecked={selectedOption === option.id}
                                        onChange={handleOptionSelect}
                                    />
                                ))}
                                
                            </div>
                        </div>
                        
                        {/* 2. CHUYÊN KHOA */}
                        <div className={`p-6 rounded-lg shadow bg-white ${currentStep !== 2 ? 'hidden' : 'block'} mb-5`}>
                            <div className="flex items-center justify-between cursor-pointer">
                                <h3 className="font-semibold text-base flex items-center text-blue-600">
                                    <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 bg-blue-600 text-white">2</span>
                                    Chuyên khoa
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 mb-4">Chọn chuyên khoa...</p>
                            <div className="space-y-4">
                                {specialties.map(spec => (
                                    <OptionBox
                                        key={spec.id}
                                        id={spec.id}
                                        label={spec.label}
                                        // Không truyền price, nó sẽ được coi là Specialty Box
                                        isChecked={selectedSpecialty === spec.id}
                                        onChange={handleSpecialtySelect}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 3. NGÀY KHÁM */}
                        <div className={`p-6 rounded-lg shadow bg-white ${currentStep < 3 ? 'hidden' : 'block'} mb-5`}>
                            <div 
                                className={`flex items-center justify-between cursor-pointer ${currentStep > 3 ? 'hover:bg-gray-50 p-2 -m-2 rounded' : ''}`}
                                onClick={() => handleToggle(3)} 
                            >
                                <h3 className={`font-semibold text-base flex items-center ${currentStep === 3 ? 'text-blue-600' : 'text-gray-800'}`}>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 ${currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-400 text-gray-700'}`}>3</span>
                                    Ngày khám
                                </h3>
                                {currentStep > 3 && (
                                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${currentStep !== 3 ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </div>
                            {currentStep === 3 && (
                                <div className="mt-4">
                                    <CalendarComponent onSelectDay={handleDaySelect} selectedDate={selectedDate} schedules={schedules}/> 
                                </div>
                            )}
                        </div>
                        
                        {/* 4. GIỜ KHÁM */}
                        <div className={`p-6 rounded-lg shadow bg-white ${currentStep < 4 ? 'hidden' : 'block'} mb-5`}>
                            <div 
                                className={`flex items-center justify-between cursor-pointer ${currentStep > 4 ? 'hover:bg-gray-50 p-2 -m-2 rounded' : ''}`}
                                onClick={() => handleToggle(4)}
                            >
                                <h3 className={`font-semibold text-base flex items-center ${currentStep === 4 ? 'text-blue-600' : 'text-gray-800'}`}>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 ${currentStep === 4 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-400 text-gray-700'}`}>4</span>
                                    Giờ khám
                                </h3>
                                {currentStep > 4 && (
                                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${currentStep !== 4 ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </div>
                            {currentStep === 4 && (
                                <div className="mt-4">
                                    <TimeSlotSelector 
                                    times={schedules[selectedScheduleKey]|| []}
                                    onSelectTime={handleTimeSelect} 
                                    selectedTime={selectedTime}/>
                                </div>
                            )}
                        </div>

                        {/* 5. BỆNH NHÂN */}
                        <div className={`p-6 rounded-lg shadow bg-white ${currentStep < 5 ? 'hidden' : 'block'}`}>
                            <div className={`flex items-center justify-between cursor-pointer`}>
                                <h3 className={`font-semibold text-base flex items-center text-blue-600`}>
                                    <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 bg-blue-600 text-white">5</span>
                                    Bệnh nhân
                                </h3>
                            </div>
                            {currentStep === 5 && (
                                <div className="space-y-4 mt-4"> 
                                    <div className="border border-blue-400 p-4 rounded-lg bg-blue-50">
                                        <div className="font-semibold">{patientDetails.name}</div>
                                        <div className="text-sm text-gray-600">{patientDetails.dob}</div>
                                    </div>
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
                        
                        {/* Thông tin Bệnh viện */}
                        <div className="p-4 flex flex-col border-b">
                            <div className="flex items-center mb-2">
                                <img src={hospital.image} alt="avatar" className="w-12 h-12 rounded-full mr-2"/>
                                <div>
                                    <div className="font-semibold text-gray-800">{hospital.name}</div>
                                    <div className="text-xs text-gray-600">{hospital.address}</div>
                                </div>
                            </div>
                            {/* Bác sĩ phụ trách (Giữ nguyên hoặc thay bằng thông tin Bệnh viện) */}
                            {/* <div className="font-medium text-sm mt-1">BS. {hospital.doctorName}</div>  */}
                        </div>

                        {/* Chi tiết Đặt khám (Loại hình, Chuyên khoa, Ngày, Giờ) */}
                        <div className="p-4 space-y-2 text-sm">
                            
                            {/* LOẠI HÌNH KHÁM (Mới) */}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Loại hình khám</span>
                                <span className="font-semibold text-gray-800">
                                    {getSelectedOptionLabel(selectedOption)}
                                </span> 
                            </div>
                            
                            {/* CHUYÊN KHOA (Mới) */}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Chuyên khoa</span>
                                <span className="font-semibold text-gray-800">
                                    {getSelectedSpecialtyLabel(selectedSpecialty)}
                                </span> 
                            </div>

                            {/* NGÀY KHÁM */}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Ngày khám</span>
                                <span className="font-semibold text-gray-800">{selectedDate || '---'}</span> 
                            </div>
                            
                            {/* GIỜ KHÁM */}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Giờ khám</span>
                                <span className="font-semibold text-gray-800">{selectedTime || '---'}</span> 
                            </div>
                        </div>
                        
                        {/* BỆNH NHÂN và NÚT HÀNH ĐỘNG */}
                        <div className="p-4 pt-0">
                            <div className="flex justify-between border-t pt-2 mt-2">
                                <span className="text-gray-600">Bệnh nhân</span>
                                <span className="font-semibold text-gray-800">
                                    {/* Hiển thị tên bệnh nhân nếu ở bước 5, nếu không thì hiển thị trạng thái */}
                                    {currentStep === 5 ? patientDetails.name : 'Chọn hồ sơ'}
                                </span>
                            </div>
                            
                            {/* NÚT XÁC NHẬN / ĐẶT LỊCH */}
                            <button
                                onClick={handleBooking} 
                                // CHỈ KÍCH HOẠT KHI ĐANG Ở BƯỚC 5 VÀ ĐÃ CHỌN ĐỦ THÔNG TIN
                                className={`mt-4 py-3 rounded font-semibold transition w-full ${
                                    isReadyToBook
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                }`}
                                disabled={!isReadyToBook}
                            >
                                Xác nhận đặt khám
                            </button>
                            
                            {/* Điều khoản */}
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Bằng cách nhấn nút xác nhận, bạn đã đồng ý với các điều khoản và điều kiện đặt khám
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <BookingDownloadApp />
            <HomeFooter />
        </>      
    );
}

export default CompleteBookingHospital;