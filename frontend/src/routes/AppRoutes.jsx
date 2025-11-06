import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import HomePage from "../pages/Home/HomePage";
import BookingPage from "../pages/Booking/BookingPage";
import BookingSearch from "../pages/Booking/BookingSearch";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import DoctorProfile from "../pages/Booking/DoctorProfile";

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

      {/* Đặt khám Phòng khám */}
      <Route
        path="/dat-kham/phong-kham"
        element={
          <MainLayout>
            <BookingPage selectedTab={3} />
          </MainLayout>
        }
      />

      {/* Đặt lịch tiêm chủng */}
      <Route
        path="/dat-kham/tiem-chung"
        element={
          <MainLayout>
            <BookingPage selectedTab={4} />
          </MainLayout>
        }
      />

      {/* Đặt lịch xét nghiệm */}
      <Route
        path="/dat-kham/xet-nghiem"
        element={
          <MainLayout>
            <BookingPage selectedTab={5} />
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