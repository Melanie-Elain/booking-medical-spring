// BƯỚC 1: Import thêm useState
import React, { useState } from "react";
import "../../assets/Home/HomeNews.css";

import imgThuoc1 from '../../assets/images/news/1.webp';
import imgThuoc2 from '../../assets/images/news/2.webp';
import imgThuoc3 from '../../assets/images/news/3.webp';
import imgThuoc4 from '../../assets/images/news/4.webp';
import imgDuoclieu1 from '../../assets/images/news/5.webp';
import imgDuoclieu2 from '../../assets/images/news/6.webp';
import imgDuoclieu3 from '../../assets/images/news/7.webp';
import imgDuoclieu4 from '../../assets/images/news/8.webp';
import imgBenh1 from '../../assets/images/news/9.webp';
import imgBenh2 from '../../assets/images/news/10.webp';
import imgBenh3 from '../../assets/images/news/11.webp';
import imgBenh4 from '../../assets/images/news/12.webp';
import imgCothe1 from '../../assets/images/news/13.webp';
import imgCothe2 from '../../assets/images/news/14.webp';
import imgCothe3 from '../../assets/images/news/15.webp';
import imgCothe4 from '../../assets/images/news/16.webp';

// BƯỚC 2: Tạo dữ liệu giả cho TẤT CẢ các tab
// Dữ liệu này được sắp xếp trong một object, với key là tên của tab
const allNewsData = {
  // Dữ liệu cho tab "Thuốc" (Lấy từ ảnh image_88fbc2.png)
  thuoc: [
    {
      id: "t1",
      image: imgThuoc1,
      title: "Thuốc Metronidazol là gì? Tác dụng, cách dùng và những điều...",
      author: "Dược sĩ Phan Hữu Xuân Hạo",
      date: "20/05/2025"
    },
    {
      id: "t2",
      image: imgThuoc2,
      title: "Thuốc Lomexin 1000mg là gì?",
      author: "ThS.BS Nguyễn Ngọc Khánh",
      date: "25/12/2024"
    },
    {
      id: "t3",
      image: imgThuoc3,
      title: "Lomexin 200mg là thuốc gì? Công dụng, cách dùng và lưu ý",
      author: "ThS.BS Nguyễn Ngọc Khánh",
      date: "24/12/2024"
    },
    {
      id: "t4",
      image: imgThuoc4,
      title: "Thuốc NextG Cal: Bổ sung canxi và điều trị loãng xương",
      author: "Bác sĩ Trần Văn Thy",
      date: "20/04/2022"
    }
  ],
  // Dữ liệu cho tab "Dược liệu" (Lấy từ ảnh image_88fbe7.jpg)
  duoclieu: [
    {
      id: "d1",
      image: imgDuoclieu1,
      title: "Tinh dầu sả: công dụng, cách dùng và lưu ý",
      author: "ThS.BS Nguyễn Thị Lệ Quyên",
      date: "17/10/2025"
    },
    {
      id: "d2",
      image: imgDuoclieu2,
      title: "Biển súc – Vị thuốc quý và những công dụng đối với sức khỏe",
      author: "ThS.BS Nguyễn Thị Lệ Quyên",
      date: "23/10/2022"
    },
    {
      id: "d3",
      image: imgDuoclieu3,
      title: "Băng phiến &#8211; Những tác dụng và những lưu ý khi dùng",
      author: "Bác sĩ Hà Thị Ngọc Bích",
      date: "16/10/2022"
    },
    {
      id: "d4",
      image: imgDuoclieu4,
      title: "Tinh dầu trầm hương: giá trị thực sự của loại tinh dầu đắt đỏ",
      author: "Bác sĩ Phạm Lê Phương Mai",
      date: "16/10/2022"
    }
  ],
  // Dữ liệu cho tab "Bệnh" (Lấy từ ảnh image_88feca.jpg)
  benh: [
    {
      id: "b1",
      image: imgBenh1,
      title: "Thực phẩm bổ sung kẽm cho nam giới nào được chuyên gia khuyên...",
      author: "Dược sĩ Đinh Thị Bích Phượng",
      date: "22/05/2021"
    },
    {
      id: "b2",
      image: imgBenh2,
      title: "Chất bảo quản thực phẩm là gì? Vì sao cần sử dụng?",
      author: "Bác sĩ Nguyễn Thường Hanh",
      date: "21/05/2021"
    },
    {
      id: "b3",
      image: imgBenh3,
      title: "Cách sơ cứu đột quỵ tại nhà: Hướng dẫn từ bác sĩ chuyên khoa",
      author: "ThS.BS Nguyễn Hữu Tín",
      date: "29/07/2025"
    },
    {
      id: "b4",
      img: imgBenh4,
      title: "Sơ cứu đột quỵ bằng kim chích lấy máu đơn giản có thực sự hiệu quả...",
      author: "ThS.BS.CKI Nguyễn Hữu Tín",
      date: "03/01/2025"
    }
  ],
  // Dữ liệu cho tab "Cơ thể" (Lấy từ ảnh image_88feee.jpg)
  cothe: [
    {
      id: "c1",
      image: imgCothe1,
      title: "Tìm hiểu về hệ nội tiết của cơ thể: Chức năng và các bệnh lý liên quan",
      author: "ThS.BS Nguyễn Đỉnh Tuấn",
      date: "30/08/2022"
    },
    {
      id: "c2",
      image: imgCothe2,
      title: "Androgen và những rối loạn liên quan hormone này",
      author: "Bác sĩ Phan Hữu Xuân Hạo",
      date: "29/08/2022"
    },
    {
      id: "c3",
      image: imgCothe3,
      title: "Hormone testosterone và những thông tin bạn cần biết",
      author: "Bác sĩ Hà Thị Ngọc Bích",
      date: "19/08/2022"
    },
    {
      id: "c4",
      image: imgCothe4,
      title: "Hormone Estrogen và những thông tin bạn cần biết",
      author: "ThS.BS Võ Đình Bảo Vận",
      date: "11/08/2022"
    }
  ],
};

// Tạo một object để map key của tab với placeholder text
const placeholderMap = {
  thuoc: "Nhập tên thuốc cần tìm...",
  duoclieu: "Nhập tên dược liệu cần tìm...",
  benh: "Nhập tên bệnh, triệu chứng cần tìm...",
  cothe: "Nhập tên bộ phận cơ thể..."
};
// ----------------------------------------


const HomeNews = () => {

  // BƯỚC 3: Khởi tạo state. 'thuoc' là tab active mặc định
  const [activeTab, setActiveTab] = useState('thuoc');

  return (
    <section className="homenews-section">
      <div className="homenews-container">
        
        <div className="homenews-header">
          <h2>Tin Y Tế</h2>
          <p>Chính thống - Minh bạch - Trung lập</p>
        </div>

        <div className="homenews-nav">
          <div className="homenews-tabs">
            
            {/* BƯỚC 4: Cập nhật các nút tab */}
            <button 
              className={activeTab === 'thuoc' ? 'tab-item active' : 'tab-item'}
              onClick={() => setActiveTab('thuoc')}
            >
              Thuốc
            </button>
            <button 
              className={activeTab === 'duoclieu' ? 'tab-item active' : 'tab-item'}
              onClick={() => setActiveTab('duoclieu')}
            >
              Dược liệu
            </button>
            <button 
              className={activeTab === 'benh' ? 'tab-item active' : 'tab-item'}
              onClick={() => setActiveTab('benh')}
            >
              Bệnh
            </button>
            <button 
              className={activeTab === 'cothe' ? 'tab-item active' : 'tab-item'}
              onClick={() => setActiveTab('cothe')}
            >
              Cơ thể
            </button>
          </div>
          <div className="homenews-search">
            {/* BƯỚC 5: Cập nhật placeholder động */}
            <input type="text" placeholder={placeholderMap[activeTab]} />
          </div>
        </div>

        <div className="homenews-content-slider">
          {/* BƯỚC 6: Render nội dung dựa trên state 'activeTab' */}
          {allNewsData[activeTab].map((article) => (
            <div key={article.id} className="article-card">
              <a href="#" className="article-link">
                <img src={article.image} alt={article.title} className="article-image" />
                <div className="article-card-content">
                  <h4 className="article-title">{article.title}</h4>
                  <p className="article-meta">
                    {article.author} - Cập nhật: {article.date}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default HomeNews;