import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import News from "../../components/Home/HomeNews";
import "../../assets/Home/MedicalNews.css";

const MedicalNewsPage = () => {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            navigate(`/tin-y-te?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <section className="medical-news-container">
            <div className="medical-news-header">
                <div className="header-container">
                    <h1 className="header-title">Thông tin y tế</h1>
                    {/* Search */}
                    <div className="header-search">
                        {/* Desktop search */}
                        <div className="search-desktop">
                            <form onSubmit={handleSearch}>
                                <input
                                    type="search"
                                    placeholder="Tìm kiếm bài viết, thông tin bệnh, thuốc …"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button type="submit">
                                    <IoSearchOutline size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <News/>
        </section>
    );
};

export default MedicalNewsPage;