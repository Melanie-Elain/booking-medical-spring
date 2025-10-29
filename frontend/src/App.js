
import './App.css';

import React from "react";
import HomePage from "./pages/Home/HomePage";
import {Routes, Route } from "react-router-dom";
import BookingDoctor from "./pages/Booking/BookingDoctor"; 
import MainLayout from "./components/MainLayout";
import BookingPage from './pages/Booking/BookingPage';  


function App() {
  return (
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <HomePage />
          </MainLayout> 
        } /> 
        <Route path="/Booking/BookingDoctor" element={
          <MainLayout>
            <BookingPage />
          </MainLayout>
        } />
        <Route path="/Booking/BookingDoctor/searchDoctor" element={
            <BookingDoctor />
        } />
      </Routes>
  );
}

export default App;
