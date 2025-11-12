import React from "react";

const BookingDownloadApp = () => {
    return (
        <div className="w-full">
            <div className="m-6 flex flex-r items-center gap-2 max-w-4xl mx-auto justify-between items-center">
                <div>
                    <p className="font-semibold">Đặt lịch khám Bệnh viện, Bác sĩ dễ dàng</p>
                    <p className="text-xl font-bold">Tải ngay YouMed</p>
                    <div className="flex gap-4 mt-2">
                        <img  src="https://youmed.vn/dat-kham/assets/img/booking/svg/google-play.svg" alt="Google Play" className="h-10 border rounded-lg" />
                        <img src="https://youmed.vn/dat-kham/assets/img/booking/svg/apple-store.svg" alt="App Store" className="h-10 border rounded-lg" />
                    </div>
                    
                </div>
                <div className="border-8 border-gray-200 rounded-xl">
                    <img className="w-32 h-32" src="https://youmed.vn/dat-kham/assets/images/qr-download.svg" alt="" />
                </div>
            </div>
        </div>
    );
}
export default BookingDownloadApp;