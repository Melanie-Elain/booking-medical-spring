import React from 'react';
import Header from '../../components/Home/Header';
import HomeFooter from '../../components/Home/HomeFooter';
import { CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom'; // Import useLocation

const BookingSuccessPage = () => {
    // 1. Dùng useLocation để nhận state
    const location = useLocation();
    const successDetails = location.state;

    // Dữ liệu giả định nếu không có state (fallback)
    const fallbackData = {
        doctorName: "Lỗi dữ liệu",
        doctorAddress: "Vui lòng tải lại trang",
        doctorImage: "https://via.placeholder.com/40",
        clinicName: "Không xác định",
        stt: 0,
        patientName: "Không xác định",
        note: "Không có ghi chú",
    };

    const bookingDetails = successDetails ? {
        mainName: successDetails.mainName,
        mainAddress: successDetails.mainAddress,
        image: successDetails.mainImage,

        code: successDetails.code,
        stt: successDetails.stt,
        date: successDetails.date,
        time: successDetails.time,
        patientName: successDetails.patient.name,
        dob: successDetails.patient.dob,
        gender: successDetails.patient.gender,
        address: successDetails.patient.address,
        note: successDetails.patient.note,
    } : fallbackData;

    console.log("Dữ liệu Booking Details:", bookingDetails);
    const displayMainTitle = bookingDetails.clinicName || bookingDetails.mainName;

    return (
        <>
            <Header />
            <div className="bg-gray-100 py-12">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
                    
                    {/* KHỐI TIÊU ĐỀ THÀNH CÔNG */}
                    <div className="text-center mb-8">
                        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800">Đặt lịch thành công!</h1>
                        
                    </div>

                    {/* THÔNG TIN CHÍNH (Linh hoạt giữa Bác sĩ và Phòng khám) */}
                    <div className="border-b pb-4 mb-6">
                        <div className="flex items-center">
                            <img 
                                src={bookingDetails.image || fallbackData.doctorImage} 
                                alt="Avatar" 
                                className="w-10 h-10 rounded-full mr-3" 
                            />
                            <div>
                                {/* Dòng 1: Tên Phòng khám/Bác sĩ chính */}
                                <div className="font-semibold text-gray-800">{displayMainTitle}</div>
                                
                                {/* Dòng 2: Địa chỉ hoặc Tên Bác sĩ phụ trách */}
                                <div className="text-sm text-gray-500">
                                    {bookingDetails.mainAddress
                                        
                                    }
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>

                    {/* THÔNG TIN ĐẶT LỊCH (Giữ nguyên) */}
                    {/* ... */}
                    <h2 className="font-bold text-lg mb-4 text-gray-800">Thông tin đặt lịch</h2>
                    <div className="space-y-2 mb-8 text-sm">
                        {/* <div className="flex justify-between border-b pb-1">
                            <span className="text-gray-600">Mã phiếu khám</span>
                            <span className="font-medium">{bookingDetails.code}</span>
                        </div> */}
                        
                        <div className="flex justify-between border-b pb-1">
                            <span className="text-gray-600">Ngày</span>
                            <span className="font-medium">{bookingDetails.date}</span>
                        </div>
                        <div className="flex justify-between pb-1">
                            <span className="text-gray-600">Giờ khám</span>
                            <span className="font-medium text-green-600">{bookingDetails.time}</span>
                        </div>
                    </div>

                    {/* THÔNG TIN BỆNH NHÂN (Giữ nguyên) */}
                    {/* ... */}
                    <h2 className="font-bold text-lg mb-4 text-gray-800">Thông tin bệnh nhân</h2>
                    <div className="space-y-2 mb-8 text-sm">
                        <div className="flex justify-between border-b pb-1">
                            <span className="text-gray-600">Bệnh nhân</span>
                            <span className="font-medium">{bookingDetails.patientName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                            <span className="text-gray-600">Ngày sinh</span>
                            <span className="font-medium">{bookingDetails.dob}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                            <span className="text-gray-600">Giới tính</span>
                            <span className="font-medium">{bookingDetails.gender}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                            <span className="text-gray-600">Địa chỉ</span>
                            <span className="font-medium">{bookingDetails.address}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Ghi chú</span>
                            <span className="font-medium">{bookingDetails.note}</span>
                        </div>
                    </div>

                    {/* NÚT HÀNH ĐỘNG */}
                    <div className="flex justify-between mt-8 space-x-4">
                        <button className="flex-1 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                            Xem phiếu khám
                        </button>
                        <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                            Lưu lại phiếu
                        </button>
                    </div>

                </div>
            </div>
            <HomeFooter />
        </>
    );
};

export default BookingSuccessPage;