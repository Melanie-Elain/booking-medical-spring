import React, { useState } from "react";
import { Search, MapPin, Stethoscope, LocateFixed , ChevronDown, X } from "lucide-react";
import Header from '../../components/Home/Header';
import DownloadApp from "../../components/Home/DownloadApp";
import HomeFooter from "../../components/Home/HomeFooter";
import ReactPaginate from "react-paginate";
import doctorsData from "../../data/doctorsData";



    const specialties = [
      { id: 1, name: "Dị ứng - miễn dịch", icon: "🛡️" },
      { id: 2, name: "Y học cổ truyền", icon: "🌿" },
      { id: 3, name: "Lao - bệnh phổi", icon: "🫁" },
      { id: 4, name: "Y học thể thao", icon: "🏃‍♂️" },
      { id: 5, name: "Tim mạch", icon: "❤️" },
      { id: 6, name: "Thần kinh", icon: "🧠" },
      { id: 7, name: "Nhi khoa", icon: "👶" },
      { id: 8, name: "Da liễu", icon: "🧴" },
    ];
    


const BookingDoctor = () => {
    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = React.useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [selected, setSelected] = useState(null);
    const [selected1, setSelected1] = useState(null);
    const [selected2, setSelected2] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);
    const doctorsPerPage = 6; 

    const doctors = doctorsData;

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) 
    );

    const startIndex = currentPage * doctorsPerPage;
    const selectedDoctors = filteredDoctors.slice(
      startIndex,
      startIndex + doctorsPerPage
    );

    const pageCount = Math.ceil(filteredDoctors.length / doctorsPerPage);

    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const options = ["Tất cả", "Bác sĩ", "Bệnh viện", "Phòng khám"];

    const options2= ["Dị ứng - Miễn dịch", "Y học cổ truyền", "Lao - Bênh phổi", "Y học thể thao"];

    const filtered = specialties.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <Header/>
        <main className="w-full mx-auto py-10">
      {/* Thanh tìm kiếm */}
      <div className=" border flex flex-col items-center w-full fixed top-[60px] left-0  mb-8 bg-white py-5 z-[9999]">
        <div className="relative w-full max-w-3xl">
          <input
            type="text"
            placeholder="Tìm theo triệu chứng, bác sĩ, bệnh viện..."
            className="w-full border border-gray-300 rounded-full py-3 px-5 pl-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
        </div>

        {/* Bộ lọc */}
        <div className="flex flex-wrap justify-center gap-3 mt-5">
          <button
            onClick={()=> setIsOpen(true)}
            className="flex items-center gap-2 bg-gray-100 text-gray-800 font-medium rounded-full px-4 py-2 border border-gray-300 hover:bg-blue-50"
          >
            Nơi khám: {selected}
            <ChevronDown size={16} />
          </button>

          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white w-[90%] max-w-sm rounded-2xl shadow-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Lọc theo nơi khám</h3>
                  <button onClick={() => setIsOpen(false)}>
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelected(opt);
                        setIsOpen(false);
                      }}
                      className={`text-left px-4 py-2 rounded-lg ${
                        selected === opt
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsOpen1(true)}
             className={`flex items-center gap-2 border px-4 py-2 rounded-full transition-all 
             ${
               selected1
                 ? "bg-blue-50 text-blue-600 border-blue-300"
                 : "border-gray-300 bg-white hover:bg-blue-50"
             }`}>
            <Stethoscope size={18} /> {selected1 ? selected1 : "Chọn chuyên khoa"}
          </button>
          {isOpen1 && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-lg p-5">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Tìm theo chuyên khoa</h3>
                  <button
                    onClick={() => setIsOpen1(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Ô tìm kiếm */}
                <div className="relative mb-4">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Tìm theo tên"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-200 rounded-full py-2 pl-9 pr-3 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>

                {/* Danh sách chuyên khoa */}
                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                  {filtered.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelected1(opt.name)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition border ${
                        selected1 === opt.name
                          ? "border-blue-400 bg-blue-50"
                          : "border-transparent hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>{opt.name}</span>
                    </button>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between mt-5 border-t pt-4">
                  <button
                    onClick={() => {
                      setSelected1(null);
                      setSearchTerm("");
                      setIsOpen1(false);
                    }}
                    className="text-blue-500 hover:text-blue-600 font-medium border rounded-lg w-48"
                  >
                    Xóa bộ lọc
                  </button>
                  <button
                    onClick={() => setIsOpen1(false)}
                    className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 w-48"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>
          )}
                
          <button
            onClick={() => setIsOpen2(true)}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full hover:bg-blue-50">
            <MapPin size={18} /> {selected2 ? selected2 : "Khu vực"}
          </button>
          {isOpen2 && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white w-[90%] max-w-sm rounded-2xl shadow-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Lọc theo nơi khám</h3>
                  <button onClick={() => setIsOpen2(false)}>
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {options2.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelected2(opt);
                        setIsOpen2(false);
                      }}
                      className={`text-left px-4 py-2 rounded-lg ${
                        selected2 === opt
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full hover:bg-blue-50">
            <LocateFixed  size={18} /> Gần nhất
          </button>
        </div>
      </div>

      {/* Danh sách bác sĩ */}
      <div className=" bg-gray-100 flex items-center flex-col pt-[120px]">
        <div className="bg-white w-3/5 rounded-lg border border-gray-200 my-2">
          {selectedDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex items-center justify-between border-t   p-4  "
            >
              {/* Ảnh bác sĩ */}
              <div className="flex items-center gap-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-lg hover:underline decoration-black cursor-pointer">{doctor.name}</h3>
                  <div className="flex flex-wrap gap-2 my-2">
                    {doctor.specialty.map((spec, i) => (
                      <span
                        key={i}
                        className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{doctor.address}</p>
                </div>
              </div>

              {/* Nút đặt khám */}
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                Đặt khám
              </button>
            </div>
          ))}
        </div>
        <div>
        

        </div>
        {/* Phân trang */}
        <div className="flex justify-center mt-5 mb-8">
            <ReactPaginate
              previousLabel={"‹"}
              nextLabel={"›"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"flex space-x-2"}
              pageClassName={
                "border rounded-md px-3 py-1 cursor-pointer text-gray-700 hover:bg-gray-100"
              }
              activeClassName={"bg-blue-600 text-white"}
              previousClassName={
                "border rounded-md px-3 py-1 cursor-pointer hover:bg-gray-100"
              }
              nextClassName={
                "border rounded-md px-3 py-1 cursor-pointer hover:bg-gray-100"
              }
              disabledClassName={"opacity-50 cursor-not-allowed"}
            />
          </div>
      </div>
    </main>
    <DownloadApp />
    <HomeFooter />
    </>

    );

};

export default BookingDoctor;
