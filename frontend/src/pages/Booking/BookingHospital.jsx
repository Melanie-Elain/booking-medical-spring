import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import hospitalsData from "../../data/hospitalsData";


const BookingHospital = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const hospitalPerPage = 6; 

    const hospitals= hospitalsData;
    const startIndex = currentPage * hospitalPerPage;
    const selectedHospitals = hospitalsData.slice(
      startIndex, 
      startIndex + hospitalPerPage
    );

    const pageCount = Math.ceil(hospitals.length / hospitalPerPage);

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
                onClick={() => navigate(`/dat-kham/benh-vien/${hospital.id}`)}
                >
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
