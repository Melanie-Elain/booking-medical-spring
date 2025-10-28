// import React from "react";
// import { IoSearchOutline } from "react-icons/io5";
// import "../../assets/Home/HomeBanner.css";

// const HomeBanner = () => {
//   return (
//     <section className="home-banner">
//       <div className="banner-content">
//         <h1>Ứng dụng đặt khám</h1>
//         <p>
//           Đặt khám với hơn 1000 bác sĩ, 25 bệnh viện, 100 phòng khám trên YouMed
//           để có số thứ tự và khung giờ khám trước.
//         </p>
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Triệu chứng, bác sĩ, bệnh viện..."
//           />
//           <button className="search-btn">
//             <IoSearchOutline size={20} />
//           </button>
//         </div>
//       </div>
//       <div className="banner-image">
//         <img
//           src="https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp"
//           alt="YouMed Banner"
//         />
//       </div>
//     </section>
//   );
// };

// export default HomeBanner;

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import Header from "./Header";
import "../../assets/Home/HomeBanner.css";

const HomeBanner = () => {
  return (
    <div className="home-wrapper h-fit">
      <Header />
      <section className="home-banner">
        <div className="banner-content">
          <h1>Ứng dụng đặt khám</h1>
          <p>
            Đặt khám với hơn 1000 bác sĩ, 25 bệnh viện, 100 phòng khám trên YouMed
            để có số thứ tự và khung giờ khám trước.
          </p>
          <div className="search-box">
            <input
              type="text"
              placeholder="Triệu chứng, bác sĩ, bệnh viện..."
            />
            <button className="search-btn">
              <IoSearchOutline size={20} />
            </button>
          </div>
        </div>
        <div className="banner-image">
          <img
            src="https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp"
            alt="YouMed Banner"
          />
        </div>
      </section>
    </div>
  );
};

export default HomeBanner;