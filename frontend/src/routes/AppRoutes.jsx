import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import HomePage from "../pages/Home/HomePage";
import BookingPage from "../pages/Booking/BookingPage";
import BookingDoctor from "../pages/Booking/BookingDoctor";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import BookingHospital from "../pages/Booking/BookingHospital";
import BookingClinic from "../pages/Booking/BookingClinic";

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

      {/* Đặt khám */}
      <Route
        path="/dat-kham/bac-si"
        element={
          <MainLayout>
            <BookingPage/>
          </MainLayout>
        }
      />

      <Route path="/dat-kham/bac-si/search" element={<BookingDoctor />}/>
      <Route path="/dat-kham/benh-vien" 
        element={
          <MainLayout>
            <BookingPage selectedTab = {2} />
          </MainLayout>
        }
      />
      <Route path="/dat-kham/phong-kham" 
        element={
          <MainLayout>
            <BookingPage selectedTab = {3} />
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
