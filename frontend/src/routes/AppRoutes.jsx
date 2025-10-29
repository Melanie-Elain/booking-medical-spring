import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import HomePage from "../pages/Home/HomePage";
import BookingPage from "../pages/Booking/BookingPage";
import BookingDoctor from "../pages/Booking/BookingDoctor";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

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
        path="/Booking/BookingDoctor"
        element={
          <MainLayout>
            <BookingPage />
          </MainLayout>
        }
      />

      <Route path="/Booking/BookingDoctor/searchDoctor" element={<BookingDoctor />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;
