import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import HomePage from "../pages/Home/HomePage";
import BookingPage from "../pages/Booking/BookingPage";
import BookingSearch from "../pages/Booking/BookingSearch";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

import DoctorProfile from "../pages/Booking/DoctorProfile";
import HospitalProfile from "../pages/Booking/HospitalProfile";
import ClinicProfile from "../pages/Booking/ClinicProfile";

// Các import này có thể cần thiết cho các route bên dưới
// import BookingHospital from "../pages/Booking/BookingHospital";
// import BookingClinic from "../pages/Booking/BookingClinic";
import OnlineConsultation from "../pages/Consultation/OnlineConsultationPage";
import MedicalNews from "../pages/MedicalNews/MedicalNewsPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Trang chủ */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      {/* Đặt khám Bác sĩ (mặc định) */}
      <Route
        path="/dat-kham/bac-si"
        element={
          <MainLayout>
            <BookingPage selectedTab={1} />
          </MainLayout>
        }
      />
      <Route path="/dat-kham/bac-si/search" element={<BookingSearch />} />
      <Route path="/dat-kham/bac-si/:id" element={<DoctorProfile />} />

      {/* Đặt khám Bệnh viện */}
      <Route
        path="/dat-kham/benh-vien"
        element={
          <MainLayout>
            <BookingPage selectedTab={2} />
          </MainLayout>
        }
      />
      <Route path="/dat-kham/benh-vien/:id" element={<HospitalProfile />} />

      {/* Đặt khám Phòng khám */}
      <Route
        path="/dat-kham/phong-kham"
        element={
          <MainLayout>
            <BookingPage selectedTab={3} />
          </MainLayout>
        }
      />
      <Route path="/dat-kham/phong-kham/:id" element={<ClinicProfile />} />

      {/* Đặt lịch tiêm chủng */}
      <Route
        path="/dat-kham/tiem-chung"
        element={
          <MainLayout>
            <BookingPage selectedTab={4} />
          </MainLayout>
        }
      />

      {/* Đặt lịch xét nghiệm  */}
      <Route
        path="/dat-kham/xet-nghiem"
        element={
          <MainLayout>
            <BookingPage selectedTab={5} />
          </MainLayout>
        }
      />

      {/* OnlineConsultation  */}
      <Route
        path="/tu-van-truc-tuyen"
        element={
          <MainLayout>
            <OnlineConsultation />
          </MainLayout>
        }
      />

      {/* MedicalNews  */}
      <Route
        path="/tin-y-te"
        element={
          <MainLayout>
            <MedicalNews />
          </MainLayout>
        }
      />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;