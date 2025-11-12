import React from "react";
import { useNavigate } from "react-router-dom";

const BookingSearchCard = ({ item }) => {
    const navigate = useNavigate();
    const handleBookClick = (e) => {
        e.stopPropagation();
        navigate(`/dat-kham/bac-si/${item.id}/hoan-tat-dat-kham`);
    }

    const handleCardClick = () => {
        navigate(`/dat-kham/bac-si/${item.id}`);
    }
    return (
        <>
            <div
              key={item.id}
              className="flex items-center justify-between border-t   p-4  "
              onClick={() => handleCardClick()}
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-lg hover:underline decoration-black cursor-pointer">{item.name}</h3>
                  <div className="flex flex-wrap gap-2 my-2">
                  {Array.isArray(item.specialty)
                    ? item.specialty.map((spec, i) => (
                        <span
                        key={i}
                        className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full"
                        >
                        {spec}
                        </span>
                    ))
                    : item.specialty && (
                        <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                        {item.specialty}
                        </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{item.address}</p>
                </div>
              </div>

              {/* Nút đặt khám */}
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    onClick={(e) => handleBookClick(e)}
              >
                Đặt khám
              </button>
        </div>
        </>
        
    );}

export default BookingSearchCard;