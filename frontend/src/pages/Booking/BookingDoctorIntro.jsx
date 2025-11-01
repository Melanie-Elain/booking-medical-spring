import React from "react";
import doctorImage from "../../assets/images/doctor/Feature1.webp";


const BookingDoctorIntro = () => {
  return (
    <section className="flex flex-col items-center justify-between px-6 md:px-20 py-12 bg-white">
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                An tâm tìm và đặt bác sĩ
            </h2>
            <p className="text-gray-500 mb-8">
                Hơn 600 bác sĩ liên kết chính thức với YouMed
            </p>
        </div>
        <div className="flex flex-row ">
            <div className="md:w-1/2 flex justify-center ">
                <img
                src={doctorImage}
                alt="Nhóm bác sĩ"
                className="w-[90%] md:w-[80%] object-contain"
                />
            </div>

            <div className=" md:w-1/2 mt-10 md:mt-0  border-l">
                <div className="group p-12 border-l-4 border-l-transparent hover:cursor-pointer hover:border-blue-600">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1  group-hover:text-blue-600">
                    Đội ngũ bác sĩ
                    </h3>
                    <p className="text-gray-600">
                    Tất cả các bác sĩ đều có liên kết chính thức với YouMed để bảo đảm
                    lịch đặt khám của bạn được xác nhận.
                    </p>
                </div>

                <hr className="border-gray-200" />

                <div className="group p-12 border-l-4 border-l-transparent hover:cursor-pointer hover:border-blue-600">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1  group-hover:text-blue-600">
                    Đặt khám dễ dàng, nhanh chóng, chủ động
                    </h3>
                    <p className="text-gray-600">
                    Chỉ với 1 phút, bạn có thể đặt khám thành công với bác sĩ. Phiếu
                    khám bao gồm số thứ tự và khung thời gian dự kiến.
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default BookingDoctorIntro;
