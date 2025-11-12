import React, {useRef} from "react";
import HospitalCard from "../Booking/HospitalCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import hospitalsData from "../../data/hospitalsData";

const HomeHospital = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const hospitals = hospitalsData;
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  return (
    <section className="py-16 px-10">
      <div className="w-[85%] max-w-7xl mx-auto relative">
        
        <div className="flex justify-between px-4">
          <div>
            <h3 className=" mb-4 text-[24px] font-[700]">Đặt khám bệnh viện</h3>
            <p className="text-gray-500 mb-8">
            Đặt khám và thanh toán để có phiếu khám (thời gian, số thứ tự) trước khi đi khám các bệnh viện kết nối chính thức với YouMed.
            </p>
          </div>
          
          <button className="bg-blue-600 text-white px-5 py-2 h-10 rounded-full hover:bg-blue-700"
              onClick={() => navigate("/dat-kham/benh-vien")}
          >
            Xem thêm →
          </button>
        </div>
        <div className="relative">
          <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
          >
              <ChevronLeft size={24}/>
          </button>
          <div ref={scrollRef} className="flex space-x-6 overflow-x-scroll pb-4  px-4">
            {hospitals.map((hos, index) => (
              <div key={index} className="flex-shrink-0 w-72">
                <HospitalCard hospital={hos} />
              </div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
          >
            <ChevronRight size={24}/>
          </button>
        </div>
        
      </div>
      
    </section>
  );
};

export default HomeHospital;
