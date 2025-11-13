import React ,{useState, useEffect} from "react";
import "../../assets/Home/HomeClinic.css";
import { useNavigate } from "react-router-dom";
import { clinicService } from "../../api/clinicService";


const ClinicCard = ({ clinic, navigate }) => (
    <div className="clinic-card"
        onClick={() => navigate(`/dat-kham/phong-kham/${clinic.id}`)}
    >
        <div className="logo-container">
            <img 
                src={clinic.image} 
                alt={clinic.name} 
                className="clinic-logo" 
            /> 
        </div>
        <div className="clinic-info">
            <p className="clinic-card-title">{clinic.name}</p>
            <p className="clinic-card-address">{clinic.address}</p>
        </div>
    </div>
);


const HomeClinic = () => { 
    const navigate = useNavigate();
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const clinicCountToShow = 4; 
    

    useEffect(() => {
        const fetchAndSetClinics = async () =>{
            try {
                setLoading(true);
                setError(null);
                console.log("Fetching clinics data...");
                const fetchedData = await clinicService.getAllClinicsList();
                if (Array.isArray(fetchedData)) {
                    setClinics(fetchedData);
                } else if (fetchedData && fetchedData.content && Array.isArray(fetchedData.content)) {
                    setClinics(fetchedData.content);
                } else {
                    throw new Error("Phản hồi không phải là một danh sách phòng khám hợp lệ.");
                }
                console.log("Fetched clinics:", fetchedData);
                
            } catch (err) {
                console.error("Lỗi khi tải phòng khám:", err);
                setError("Không thể tải danh sách phòng khám từ server.");
            } finally {
                setLoading(false);
            }
        }
       
        fetchAndSetClinics();
    }, [clinicService]);

    const clinicsToShow = clinics.slice(0, clinicCountToShow);


    if (loading) {
        return <section className="home-clinic"><div className="container">Đang tải danh sách phòng khám...</div></section>;
    }

    if (error) {
        return <section className="home-clinic"><div className="container text-red-600">Lỗi: {error}</div></section>;
    }


    return (
        <section className="home-clinic">
            <div className="container">
                <div className="clinic-header">
                    <div className="clinic-text">
                        <h2 className="title">Đặt khám phòng khám</h2>
                        <p className="subtitle">
                            Đa dạng phòng khám với nhiều chuyên khoa khác nhau như Sản - Nhi, Tai Mũi họng, Da Liễu, Tiêu Hoá...
                        </p>
                    </div>
                    <button className="view-all-btn"
                    onClick={() => navigate("/dat-kham/phong-kham")}>
                        Xem thêm <span className="arrow-icon">
                            <div className="icon-default"><i class="fa-solid fa-chevron-right"></i></div>
                            <div className="icon-hover"><i class="fa-solid fa-arrow-right"></i></div>
                            </span>
                    </button>
                </div>
                <div className="clinic-list">
                    {clinicsToShow.map(clinic => (
                        <ClinicCard
                            key={clinic.id}
                            clinic={clinic} 
                             navigate={navigate}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeClinic;