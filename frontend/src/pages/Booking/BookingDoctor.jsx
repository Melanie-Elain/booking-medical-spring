import React, { useState } from "react";
import { Search, MapPin, Stethoscope, LocateFixed , ChevronDown, X } from "lucide-react";
import Header from '../../components/Home/Header';
import DownloadApp from "../../components/Home/DownloadApp";
import HomeFooter from "../../components/Home/HomeFooter";
import ReactPaginate from "react-paginate";


const doctorsData = [
    {
        id: 1,
        name: "BS. CK2 Lê Thị Minh Hồng",
        specialty: ["Nhi khoa"],
        address: "242 Nguyễn Chí Thanh, Phường 2, Quận 10, Hồ Chí Minh",
        image: "data:image/jpeg;base64,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",
      },
      {
        id: 2,
        name: "PGS. TS. BS Lâm Việt Trung",
        specialty: ["Tim mạch", "Hồi sức cấp cứu"],
        address: "242 Nguyễn Chí Thanh, Phường 2, Quận 10, Hồ Chí Minh",
        image: "data:image/jpeg;base64,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",
      },
      {
        id: 3,
        name: "BS. CK2 Nguyễn Thị Thu Hà",
        specialty: ["Da liễu"],
        address: "242 Nguyễn Chí Thanh, Phường 2, Quận 10, Hồ Chí Minh",
        image: "data:image/jpeg;base64,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",
      },
      {
        id: 4,
        name: "BS. CK2 Võ Đức Hiếu",
        specialty: ["Nhi khoa"],
        address: "242 Nguyễn Chí Thanh, Phường 2, Quận 10, Hồ Chí Minh",
        image: "data:image/jpeg;base64,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",
      },
      {
        id: 5,
        name: "BS. CK2 Nguyễn Thị Thu Hà",
        specialty: ["Nhi khoa"],
        address: "242 Nguyễn Chí Thanh, Phường 2, Quận 10, Hồ Chí Minh",
        image: "data:image/jpeg;base64,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",
      },
      {
        id: 6,
        name: "BS. CK2 Võ Đức Hiếu",
        specialty: ["Nhi khoa"],
        address: "242 Nguyễn Chí Thanh, Phường 2, Quận 10, Hồ Chí Minh",
        image: "data:image/jpeg;base64,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",
      },
      {
        id: 7,
        name: "BS. CK2 Nguyễn Thị Thu Hà",
        specialty: ["Nhi khoa"],
        address: "242 Nguyễn Chí Thanh, Phường 2, Quận 10, Hồ Chí Minh",
        image: "data:image/jpeg;base64,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",
      },
      {
        id: 8,
        name: "BS. CK2 Võ Đức Hiếu",
        specialty: ["Nhi khoa"],
        address: "242 Nguyễn Chí Thanh, Phường 2, Quận 10, Hồ Chí Minh",
        image: "data:image/jpeg;base64,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",
      },
    ];

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

    const filteredDoctors = doctorsData.filter((doctor) =>
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
