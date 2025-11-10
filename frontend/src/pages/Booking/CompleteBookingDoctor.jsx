// CompleteBookingDoctor.js
import React, { useState } from "react";
import Header from "../../components/Home/Header";
import HomeFooter from "../../components/Home/HomeFooter";
import BookingDownloadApp from "../../components/Booking/BookingDownloadApp";
import DateSelector from "../../components/Booking/DateSelector";
import { Check } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import doctorsData from "../../data/doctorsData";

const CompleteBookingDoctor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const doctor = doctorsData.find((d) => d.id === Number(id));
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentStep, setCurrentStep] = useState(1); 
    const [isStepOneOpen, setIsStepOneOpen] = useState(true);
    const [noteContent, setNoteContent] = useState('');
    if (!doctor) {
        return <div className="text-red-500 p-8 text-center">Đang tải hoặc không tìm thấy thông tin bác sĩ.</div>;
    }
    
    const patientDetails = {
        name: "Thanh Hằng", 
        dob: "04/01/2004",
        gender: "Nữ",
        address: "Xã Phước Kiển, Huyện Nhà Bè, Hồ Chí Minh",
        note: noteContent,
    };
    const patientName = patientDetails.name; 

    const handleTimeSelection = (date, time) => {
        setSelectedDate(date);
        setSelectedTime(time);
        
        if (date && time) {
            setCurrentStep(2); 
            setIsStepOneOpen(false); 
        } else {
            setCurrentStep(1);
            setIsStepOneOpen(true);
        }
    };

    const handleStepOneToggle = () => {
        if (currentStep === 2) {
            setIsStepOneOpen(true);
            setCurrentStep(1); 
        }
    };

    const handleBooking = () => {
        const successData = {
            mainName: doctor.name,      
            mainAddress: doctor.address,  
            mainImage: doctor.image,  
        
            stt: 5,
            code: `YMA${Math.floor(Math.random() * 1000000)}`, 
            date: selectedDate, 
            time: selectedTime, 
            patient: patientDetails
        };
        
        navigate(`/dat-kham/phieu-kham`, { state: successData });
    };

    const isReadyToBook = selectedDate && selectedTime && currentStep === 2;

    return (
        <>
            <Header />
            <div className=" bg-gray-100 p-8 ">
                <div className="flex items-center space-x-4 max-w-6xl justify-start mx-auto mb-8">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-white ${currentStep > 1 ? 'bg-blue-500' : 'bg-green-600'}`}>
                        {currentStep > 1 ? <Check size={18} /> : 1}
                    </div>
                    <span className={`${currentStep > 1 ? 'text-blue-500' : 'text-gray-800 font-semibold'}`}>Thời gian khám</span>
                    <div className="h-0.5 w-8 bg-gray-300"></div>
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                        2
                    </div>
                    <span className={`${currentStep >= 2 ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>Bệnh nhân</span>
                </div>
                <div className="flex flex-row space-x-10 max-w-7xl justify-between mx-auto mt-4">
                    <div className="w-2/3">
                        <div className={`p-6 rounded-lg shadow bg-white ${isStepOneOpen ? 'pb-4 mb-4' : 'pb-4 mb-5'}`}>
                        <div 
                            className={`flex items-center justify-between cursor-pointer ${currentStep === 2 ? ' p-2 -m-2 rounded' : ''}`}
                            onClick={handleStepOneToggle} 
                        >
                            <h3 className={`font-semibold text-base flex items-center text-blue-600`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 bg-blue-600 text-white`}>
                                    1
                                </span>
                                Ngày và giờ khám
                            </h3>
                            {currentStep === 2 && (
                                <svg 
                                    className={`w-5 h-5 text-gray-500 transition-transform ${isStepOneOpen ? 'transform rotate-180' : ''}`} 
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </div>
                        {isStepOneOpen && (
                            <div className="mt-4">
                                <DateSelector onTimeSelect={handleTimeSelection} />
                            </div>
                        )}
                        </div>
                        
                        <div className={`p-6 rounded-lg shadow bg-white ${currentStep >= 2 ? 'block' : 'hidden'}`}>
                            <div className={`flex items-center justify-between cursor-pointer`}>
                                <h3 className={`font-semibold text-base flex items-center text-blue-600`}>
                                    <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 bg-blue-600 text-white">
                                        2
                                    </span>
                                    Hồ sơ bệnh nhân
                                </h3>
                            </div>

                            {currentStep === 2 && (
                                <div className="space-y-4 mt-4"> 
                                    <div className="border border-blue-400 p-4 rounded-lg bg-blue-50">
                                        <div className="font-semibold">{patientName}</div>
                                        <div className="text-sm text-gray-600">04/01/2004</div>
                                    </div>
                                    <div>
                                        <label className="font-medium text-sm">Thông tin bổ sung (không bắt buộc)</label>
                                        <textarea className="w-full border p-2 rounded mt-1" rows="3" placeholder="Triệu chứng, thuốc đang dùng, tiền sử, ..."
                                        value={noteContent}
                                        onChange={(e) => setNoteContent(e.target.value)}
                                        ></textarea>
                                    </div>
                                    
                                </div>
                            )}
                        </div>

                    </div>
                    
                    <div className="w-1/3 min-w-[300px] bg-white rounded-lg shadow h-fit">
                        <div className="p-4 w-full border-b">
                            <h2 className="font-semibold text-lg">Thông tin đặt khám</h2>
                        </div>
                        
                        <div className="p-4 flex border-b">
                            <img src={doctor.image} alt="avatar" className="w-16 h-16 rounded-full"/>
                            <div className="pl-2">
                                <div className="font-semibold">{doctor.name}</div>
                                <div className="text-xs text-gray-600">{doctor.address}</div>
                            </div>
                        </div>

                        {selectedTime ? (
                            <div className="p-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Ngày khám:</span>
                                    <span className="font-semibold text-gray-800">{selectedDate || '---'}</span> 
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Khung giờ:</span>
                                    <span className="font-semibold text-gray-800">{selectedTime || '---'}</span> 
                                </div>
                                {currentStep === 2 && (
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
                        
                        {currentStep === 2 && (
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

export default CompleteBookingDoctor;