import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  const role = localStorage.getItem('userRole');

  // Chỉ cho phép truy cập nếu có token VÀ role là "ADMIN"
  return (token && role === 'ADMIN') ? children : <Navigate to="/" replace />;
};

export default AdminRoute;