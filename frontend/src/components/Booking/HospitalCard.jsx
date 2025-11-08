import React from "react";
import { useNavigate } from "react-router-dom";

const HospitalCard = ({ hospital }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl border border-gray-300 overflow-hidden w-72 h-[350px] flex flex-col hover:shadow-md"
          onClick={() => navigate(`/dat-kham/benh-vien/${hospital.id}`)}
    >
      {/* Ảnh banner */}
      <div className="relative">
        <img
          src={hospital.banner}
          alt="banner"
          className="w-full h-32 object-cover"
        />

        <div className="absolute left-1/4 transform -translate-x-1/2 bottom-[-40px] bg-white p-2 rounded-lg shadow-md">
          <img
            src={hospital.image}
            alt={hospital.name}
            className="w-20 h-20 object-contain"
          />
        </div>
      </div>

      {/* Nội dung */}
      <div className="pt-16 px-4 flex flex-col justify-between flex-grow mb-5">
          <h3 className="text-base font-bold mb-1 text-black-700 hover:underline cursor-pointer">
            {hospital.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{hospital.address}</p>
        <div className="text-sm text-gray-500 mt-auto">
          {hospital.schedule.map((item, index) => (
            <p key={index}>
              {item.day}: {item.time}
            </p>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default HospitalCard;
