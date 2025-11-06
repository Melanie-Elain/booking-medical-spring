import React, { useRef} from "react";
import DoctorCard from '../DoctorCard';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import doctorsData from "../../data/doctorsData";

const HomeDoctor = ({ isBookingPage = false }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const doctors = doctorsData;
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };


  return (
    <section className="py-16 px-10">
      <div className="w-[85%] max-w-7xl  mx-auto ">
        { !isBookingPage ?(
        <div className="flex justify-center items-center mb-8 ">
          <div>
            <h2 className="text-3xl font-bold ">Đặt lịch khám trực tuyến</h2>
            <p className="text-gray-600">
              Tìm Bác sĩ chính xác – Đặt lịch khám dễ dàng
            </p>
          </div>
          
        </div>): null}
        <div className="flex justify-between px-4">
          <div className="mb-8">
            <h3 className="text-[24px] font-[700] mb-4">Đặt khám bác sĩ</h3>
            {!isBookingPage ?(
            <p className="text-gray-500">
              Phiếu khám kèm số thứ tự và thời gian của bạn được xác nhận.
            </p>) : null}
          </div>
          
          <button className="bg-blue-600 text-white px-5 py-2 h-10 rounded-full hover:bg-blue-700"
              onClick={() => {
                if (isBookingPage) {
                  navigate("/dat-kham/bac-si/search");
                }
                  else{
                    navigate("/dat-kham/bac-si");
                  }
                }}
          >
            {isBookingPage ? "Xem tất cả" : "Xem thêm →"}
          </button>
        </div>
        <div className="relative">
          <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
          >
              <ChevronLeft size={24}/>
          </button>
          <div ref={scrollRef} className="flex space-x-6 overflow-x-scroll pb-4  px-4 ">
            
            {doctors.map((doc, index) => (
              <div key={index} className="flex-shrink-0 w-72">
                <DoctorCard doctor={doc} />
              </div>
            ))}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
            >
              <ChevronRight size={24}/>
          </button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HomeDoctor;
