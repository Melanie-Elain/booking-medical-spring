import React, { useState } from "react";
import Header from "../Home/Header";
import DownloadApp from "../Home/DownloadApp";
import HomeFooter from "../Home/HomeFooter";
import ReactPaginate from "react-paginate";


const hospitalsData = [
    {
      id: 1,
      name: "Bệnh viện Ung Bướu TPHCM",
      address: "47 Nguyễn Huy Lượng, Phường Bình Thạnh, TP. Hồ Chí Minh",
      image: "/images/hospital/1.webp",
    },
    {
      id: 2,
      name: "Bệnh viện Quân Y 175",
      address: "Số 786 Nguyễn Kiệm, Phường Hạnh Thông, TP. Hồ Chí Minh",
      image: "/images/hospital/2.webp",
    },
    {
      id: 3,
      name: "Bệnh viện Ung Bướu TPHCM",
      address: "47 Nguyễn Huy Lượng, Phường Bình Thạnh, TP. Hồ Chí Minh",
      image: "/images/hospital/3.webp",
    },
    {
      id: 4,
      name: "Bệnh viện Quân Y 175",
      address: "Số 786 Nguyễn Kiệm, Phường Hạnh Thông, TP. Hồ Chí Minh",
      image: "/images/hospital/4.webp",
    },
    {
      id: 5,
      name: "Bệnh viện Ung Bướu TPHCM",
      address: "47 Nguyễn Huy Lượng, Phường Bình Thạnh, TP. Hồ Chí Minh",
      image: "/images/hospital/5.webp",
    },
    {
      id: 6,
      name: "Bệnh viện Quân Y 175",
      address: "Số 786 Nguyễn Kiệm, Phường Hạnh Thông, TP. Hồ Chí Minh",
      image: "/images/hospital/6.webp",
    },
  ];


const BookingHospital = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const hospitalPerPage = 6; 

    const startIndex = currentPage * hospitalPerPage;
    const selectedHospitals = hospitalsData.slice(
      startIndex,
      startIndex + hospitalPerPage
    );

    const pageCount = Math.ceil(hospitalsData.length / hospitalPerPage);

    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <>
        <div className="bg-white flex flex-col justify-items-center max-w-4xl mx-auto">

            <div className="pt-8 pb-3 ml-5">
                <h1 className="font-[700] text-[22px] ">Đặt khám trực tuyến với các Bệnh viện</h1>
                <p className="text-sm font-normal">Chủ động chọn lịch hẹn - Đi khám không đợi chờ</p>
            </div>
            <div className=" w-full py-5">
            {selectedHospitals.map((hospital) => (
                <div
                key={hospital.id}
                className="flex items-center justify-between border-b p-4 "
                >
                {/* Ảnh bác sĩ */}
                <div className="flex items-center gap-4">
                    <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div>
                    <h3 className="font-semibold text-lg hover:underline decoration-black cursor-pointer ">{hospital.name}</h3>
                    <p className="text-base text-gray-500 font-medium">{hospital.address}</p>
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

export default BookingHospital;
