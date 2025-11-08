import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

// --- MOCK DATA ---
const labCentersData = [
  {
    id: 1,
    name: "Trung tâm xét nghiệm medlatec Hồ Chí Minh",
    address: "98 Thích Quảng Đức, Phường 05, Phú Nhuận, Hồ Chí Minh",
    image: "https://placehold.co/100x100/facc15/333?text=MEDLATEC", // Thay bằng ảnh thật
  },
  {
    id: 2,
    name: "Trung tâm xét nghiệm y khoa Tam An",
    address: "816 Sư Vạn Hạnh, Phường 12, Quận 10, TP. Hồ Chí Minh",
    image: "https://placehold.co/100x100/3b82f6/fff?text=Tam+An", // Thay bằng ảnh thật
  },
];

const BookingLabTest = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white flex flex-col max-w-4xl mx-auto">
      {/* --- PHẦN 1: BREADCRUMB & TIÊU ĐỀ --- */}
      <div className="pt-8 pb-3 ml-5 mr-5">
        <div className="text-sm text-gray-600 mb-2">
          {/* Giả lập breadcrumb */}
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span className="mx-2">/</span>
          <span>Đặt lịch xét nghiệm</span>
        </div>
        <h1 className="font-bold text-2xl text-gray-800">Đặt lịch xét nghiệm</h1>
      </div>

      {/* --- PHẦN 2: TÌM KIẾM --- */}
      <div className="pt-6 pb-6 ml-5 mr-5 border-b">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Bạn đang tìm kiếm trung tâm xét nghiệm nào?
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tên trung tâm..."
            className="w-full pl-10 pr-32 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-1 top-1 bottom-1 bg-blue-600 text-white px-6 rounded-full font-medium hover:bg-blue-700 transition-colors">
            TÌM KIẾM
          </button>
        </div>
      </div>

      {/* --- PHẦN 3: TOP TRUNG TÂM UY TÍN --- */}
      <div className="pt-8 pb-3 ml-5 mr-5">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Top trung tâm xét nghiệm uy tín
        </h2>
        <div className="w-full py-2 space-y-4">
          {labCentersData.map((center) => (
            <div
              key={center.id}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
            >
              {/* Thông tin bên trái */}
              <div className="flex-grow">
                <h3 className="font-semibold text-lg hover:underline decoration-black cursor-pointer text-gray-800">
                  {center.name}
                </h3>
                <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mt-1">
                  <MapPin size={14} className="text-gray-400" />
                  {center.address}
                </p>
              </div>

              {/* Ảnh bên phải */}
              <div className="ml-4 flex-shrink-0">
                <img
                  src={center.image}
                  alt={center.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/100x100?text=N/A";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingLabTest;