import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

// --- MOCK DATA ---
const popularVaccinesTags = [
  "#tiemchunghpv",
  "#tiemchungsotxuathuyet",
  "#tiemchungviemgan",
  "#tiemchungtreem",
];

const vaccineCategories = [
  { id: 1, name: "Vắc xin ngừa HPV", icon: "👩‍⚕️" },
  { id: 2, name: "Phòng sốt xuất huyết", icon: "🦟" },
  { id: 3, name: "Viêm gan A-B", icon: "🩸" },
  { id: 4, name: "Vắc xin phòng cúm", icon: "🤧" },
];

const trustedCenters = [
  {
    id: 1,
    name: "Hệ thống tiêm chủng Long Châu",
    address: "Trên toàn quốc",
    image: "https://placehold.co/100x100/png?text=LongChau",
    type: "Tiêm chủng",
  },
  {
    id: 2,
    name: "Hệ thống tiêm chủng VNVC",
    address: "Trên toàn quốc",
    image: "https://placehold.co/100x100/png?text=VNVC",
    type: "Tiêm chủng",
  },
   {
    id: 3,
    name: "Hệ thống Phòng khám Nhi đồng 315 và Tiêm chủng",
    address: "Nhiều cơ sở",
    image: "https://placehold.co/100x100/png?text=315",
    type: "Tiêm chủng",
  },
];

const BookingVaccination = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white flex flex-col max-w-4xl mx-auto">
      {/* --- PHẦN 1: TÌM KIẾM & TAGS --- */}
      <div className="pt-8 pb-6 ml-5 mr-5 border-b">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Bạn đang tìm kiếm loại vaccine nào?
        </h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm trung tâm, loại vaccine..."
            className="w-full pl-10 pr-24 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-1 top-1 bottom-1 bg-blue-600 text-white px-6 rounded-full font-medium hover:bg-blue-700 transition-colors">
            TÌM KIẾM
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-600 mr-2">Tìm kiếm phổ biến:</span>
          {popularVaccinesTags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* --- PHẦN 2: DANH MỤC VACCINE --- */}
      <div className="py-6 ml-5 mr-5 border-b">
        <h2 className="text-xl font-bold mb-1 text-gray-800">
          Xem các trung tâm tiêm chủng theo loại vaccine
        </h2>
        <p className="text-gray-500 mb-4 text-sm">
          Một số loại vaccine phổ biến có thể bạn quan tâm
        </p>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {vaccineCategories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer hover:shadow-md transition-shadow bg-white"
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <span className="text-center font-medium text-gray-700 text-sm">
                {category.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="border border-blue-200 text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors">
            Các loại vaccine khác
          </button>
        </div>
      </div>

      {/* --- PHẦN 3: TOP TRUNG TÂM UY TÍN --- */}
      <div className="pt-8 pb-3 ml-5 mr-5">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Top trung tâm tiêm chủng uy tín
        </h2>
        <div className="w-full py-2">
          {trustedCenters.map((center) => (
            <div
              key={center.id}
              className="flex items-center justify-between border-b py-4 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <img
                  src={center.image}
                  alt={center.name}
                  className="w-24 h-24 rounded-lg object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-lg hover:underline decoration-black cursor-pointer text-gray-800">
                    {center.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mt-1">
                    <MapPin size={14} className="text-gray-400" />
                    {center.address}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                    {center.type}
                  </span>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap ml-4">
                Đặt lịch hẹn
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 mb-8">
          <button className="border border-blue-200 text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors">
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingVaccination;