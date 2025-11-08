import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Home/Header";
import DownloadApp from "../../components/Home/DownloadApp";
import HomeFooter from "../../components/Home/HomeFooter";
import  hospitalsData  from "../../data/hospitalsData";
import {Globe, ArrowUpRight, Phone, CircleCheck} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HospitalProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);

    const hospital = hospitalsData.find((h) => h.id === Number(id));
    if (!hospital) {
        return <div className="p-6 text-center text-gray-500">Không tìm thấy bệnh viện.</div>;
    }
    return (
        <>
            <Header />
            <div className="pb-5 max-w-5xl mx-auto flex flex-row py-2">
                <a href="" className="hover:text-blue-600">Trang chủ</a>
                <p className="px-1">/</p>
                <a href="" className="hover:text-blue-600"> Bác sĩ</a>
            </div>
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-row pb-5">
                    <div className="pr-8">
                        <img src={hospital.image} alt={hospital.name} />
                    </div>
                    <div>
                        <h1 className="font-[700] text-[22px] ">{hospital.name}</h1>
                        <p className="text-gray-600 font-medium">{hospital.slogan}</p>
                        <div className="flex flex-row space-x-4 pt-10">
                            <button className="flex border rounded-2xl px-3 py-1 items-center hover:text-blue-600">
                                <Globe className="mr-2 text-blue-600" size={18}/> Website
                            </button>
                            <button className="flex border rounded-2xl px-3 py-1 items-center  hover:text-blue-600">
                                <ArrowUpRight className="mr-2 text-blue-600" size={18}/> Đường đi
                            </button>
                            <button className="flex border rounded-2xl px-3 py-1 items-center  hover:text-blue-600">
                                <Phone className="mr-2 text-blue-600" size={18}/> Tổng đài bệnh viện: 0123456789
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-y ">
                <div className="flex flex-row max-w-5xl mx-auto py-2 font-semibold">
                    <a href="" className="p-2 px-5 hover:bg-gray-200 rounded-xl">Thông tin</a>
                    <a href="" className="p-2 px-5 hover:bg-gray-200 rounded-xl">Chuyên khám</a>
                </div>
            </div>
            <div className="max-w-5xl mx-auto pt-5">
                <div className="grid md:grid-cols-5 gap-2 w-full rounded-lg overflow-hidden">
                    {hospital.imageIntro.map((img, index) => 
                        index === 0 ? (
                            <div className="md:col-span-3 md:row-span-2 relative">
                                <img
                                src={img}
                                alt="Hình lớn"
                                className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        ):(
                            <img
                            src={img}
                            alt={`Hình nhỏ ${index}`}
                            className="w-full h-full object-cover rounded-lg"
                            />
                        ))};
                </div>               
            </div>
            <div className="max-w-5xl mx-auto flex justify-end">
                <button className="w-2/5 bg-blue-600 rounded-lg py-2 text-white font-semibold">
                    Đặt khám ngay
                </button>
            </div>
            <div className="grid grid-cols-2 max-w-5xl gap-10 mx-auto pt-10">
            <div>
                <p className="text-lg font-semibold pb-5">Giới thiệu</p>
                <p className="text-gray-700">
                {hospital.description}
                </p>
            </div>

            <div className="space-y-10 pb-10">
                <div>
                    <p className="text-lg font-semibold pb-5">Giờ làm việc</p>
                    <div className="flex flex-row pb-2 border-b border-gray-300 w-fit">
                        <p className="font-normal mr-4 text-base">Thứ 2 - Chủ Nhật</p>
                        <p className="text-gray-500 text-base">06:00 - 16:30</p>
                    </div>
                </div>
                <div>
                    <span className="text-lg font-semibold">Tổng đài hỗ trợ</span>
                    <p className="text-gray-700">
                    Trong trường hợp bạn cần hỗ trợ thêm thông tin, vui lòng liên hệ tổng đài bên dưới để được trợ giúp.
                    </p>
                    <div className="pt-3">
                        <div className="flex flex-row items-center py-2 border-b w-fit">
                           <Phone size={18} className="mr-2 text-blue-500 font-medium"/>
                           <p className="font-medium"> Tổng đài bệnh viện: {hospital.phone}</p>
                        </div>
                        <div className="flex flex-row items-center py-2 border-b w-fit">
                           <Globe size={18}  className="mr-2  text-blue-500"/>
                           <a href="" className="font-medium">Tư vấn đặt khám</a>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>
            <div className="pt-5 pb-10">
                <div  className="max-w-5xl mx-auto ">
                    <h2 className="font-semibold text-lg">Chuyên khoa</h2>
                    <div className="pt-5 grid grid-cols-5 gap-x-8 gap-y-4">
                    {hospital.specialty.map((spec, index) => (
                        <div>
                            <button
                            key={index}
                            className="inline-flex items-center bg-gray-200 text-gray-800 rounded-full px-4 py-1 text-base hover:bg-gray-300 transition"
                            onClick={() => navigate(`/dat-kham/bac-si/search`)}
                            >
                            <CircleCheck className="mr-2 text-gray-700" size={18} />
                            {spec}
                            </button>
                        </div>
                        
                    ))}
                    </div>

                </div>
            </div>
            <HomeFooter />
        </>
    );
}

export default HospitalProfile;