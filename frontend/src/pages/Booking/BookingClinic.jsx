import React, { useState } from "react";
import Header from "../../components/Home/Header";
import DownloadApp from "../../components/Home/DownloadApp";
import HomeFooter from "../../components/Home/HomeFooter";
import ReactPaginate from "react-paginate";


const clinicsData = [
    {
      id: 1,
      name: "Shine Clinic By TS.BS Trần Ngọc Ánh since 1987",
      address: "06 Trương Quyền, P.6, Q.3, TP.HCM",
      image: "/images/clinic/1.webp",
    },
    {
      id: 2,
      name: "SIM Medical Center Tân Phú",
      address: "Tòa nhà Richstar 2 - RS5, 239-241 Hòa Bình, P. Hiệp Tân, Q. Tân Phú, TP.HCM",
      image: "/images/clinic/2.webp",
    },
    {
      id: 3,
      name: "Phòng khám Nhi Mỹ Mỹ",
      address: "105/10 Nguyễn Thị Tú, P. Bình Hưng Hòa B, Q. Bình Tân, TP.HCM",
      image: "/images/clinic/3.webp",
    },
    {
      id: 4,
      name: "Phòng khám Nhi Đồng 315 Quận 10",
      address: "307 Tô Hiến Thành, P.13, Q.10, TP.HCM",
      image: "/images/clinic/4.webp",
    },
    {
      id: 5,
      name: "Phòng khám Đa khoa An Tâm",
      address: "25 Lê Văn Việt, P. Hiệp Phú, TP. Thủ Đức",
      image: "/images/clinic/5.webp",
    },
    {
    id: 6,
    name: "Phòng khám Nhi Mỹ Mỹ",
    address: "105/10 Nguyễn Thị Tú, P. Bình Hưng Hòa B, Q. Bình Tân, TP.HCM",
    image: "/images/clinic/6.webp",
    },
    {
    id: 7,
    name: "Phòng khám Nhi Đồng 315 Quận 10",
    address: "307 Tô Hiến Thành, P.13, Q.10, TP.HCM",
    image: "/images/clinic/7.webp",
    },
    {
    id: 8,
    name: "Phòng khám Đa khoa An Tâm",
    address: "25 Lê Văn Việt, P. Hiệp Phú, TP. Thủ Đức",
    image: "/images/clinic/3.webp",
    },
  ];
  

const BookingClinic = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const clinicPerPage = 6; 

    const startIndex = currentPage * clinicPerPage;
    const selectedclinics = clinicsData.slice(
      startIndex,
      startIndex + clinicPerPage
    );

    const pageCount = Math.ceil(clinicsData.length / clinicPerPage);

    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <>
        <div className="bg-white flex flex-col justify-items-center max-w-4xl mx-auto">

            <div className="pt-8 pb-3 ml-5">
                <h1 className="font-[700] text-[22px] ">Đa dạng phòng khám</h1>
                <p className="text-sm font-normal">Đặt khám dễ dàng và tiện lợi hơn với các phòng khám cùng nhiều chuyên khoa</p>
            </div>
            <div className=" w-full py-5">
            {selectedclinics.map((clinic) => (
                <div
                key={clinic.id}
                className="flex items-center justify-between border-b p-4 "
                >
                {/* Ảnh bác sĩ */}
                <div className="flex items-center gap-4">
                    <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div>
                    <h3 className="font-semibold text-lg hover:underline decoration-black cursor-pointer ">{clinic.name}</h3>
                    <p className="text-base text-gray-500 font-medium">{clinic.address}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
            
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
    
    
    </>

    );

};

export default BookingClinic;
