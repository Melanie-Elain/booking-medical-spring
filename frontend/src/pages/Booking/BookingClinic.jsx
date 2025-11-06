import React, { useState } from "react";
import Header from "../../components/Home/Header";
import DownloadApp from "../../components/Home/DownloadApp";
import HomeFooter from "../../components/Home/HomeFooter";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import clinicsData from "../../data/clinicsData";



  

const BookingClinic = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const clinicPerPage = 6; 

    const clinics = clinicsData;

    const startIndex = currentPage * clinicPerPage;

    
    const selectedclinics = clinics.slice(
      startIndex,
      startIndex + clinicPerPage
    );


    const pageCount = Math.ceil(clinics.length / clinicPerPage);

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
                onClick={() => navigate(`/dat-kham/phong-kham/${clinic.id}`)}
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
