import React from "react";
import Header from "../../components/Home/Header";
import HomeFooter from "../../components/Home/HomeFooter";
import BookingDownloadApp from "../../components/Booking/BookingDownloadApp";
import DateSelector from "../../components/Booking/DateSelector";
import { Check } from "lucide-react";
import { useParams } from "react-router-dom";
import doctorsData from "../../data/doctorsData";

const CompleteBookingDoctor = () => {
    
    const { id } = useParams();
    const doctor= doctorsData.find((d) => d.id === Number(id));
    return (
        <>
            <Header />
                <div className=" bg-gray-100 p-8 ">
                    <div className="flex items-center space-x-2  max-w-6xl justify-start mx-auto">
                    <div className="bg-green-500 w-6 h-6 rounded-md flex items-center justify-center text-white font-bold">
                        1
                    </div>
                        <span className="text-gray-800">Thời gian khám</span>
                    </div>
                    <div className="flex flex-row space-x-10 max-w-7xl justify-between mx-auto mt-8">
                    
                        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
                            <DateSelector />                                                                      
                        </div>
                        
                        <div className="mt-6 flex flex-col   bg-white rounded-lg">
                            <div className="p-4 w-full border-b">
                                <h2 className="font-semibold text-lg ">Thông tin đặt khám</h2>
                            </div>
                            <div className=" p-4 flex border-b">
                                <img
                                src={doctor.image}
                                alt="avatar"
                                className="w-16 h-16 rounded-full"
                                />
                                <div className="pl-2">
                                    <div className="font-semibold">{doctor.name}</div>
                                    <div className="text-xs text-gray-600">{doctor.address}</div>
                                </div>
                            </div>
                            <button
                                className=" bg-gray-300 text-gray-700 mx-4 s py-2 my-auto rounded cursor-not-allowed"
                                disabled
                            >
                                Xác nhận đặt khám
                            </button>
                        </div>
                    </div>
                    
                </div>
                
            <BookingDownloadApp />

            <HomeFooter />
        </>
    );
}

export default CompleteBookingDoctor;