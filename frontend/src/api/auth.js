import axios from "axios";
import axiosInstance from "./axiosConfig";

// Đổi tên biến để rõ ràng
const AUTH_API_URL = "http://localhost:8080/api/auth";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    // response.data sẽ là { token: "...", fullName: "..." }
    const response = await axios.post(`${AUTH_API_URL}/login`, data);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

// 4. THÊM HÀM MỚI: DÙNG axiosInstance (đã cấu hình) cho route private
// Hàm này sẽ gọi API '/api/auth/me' của backend
export const getCurrentUser = async () => {
  try {
    // Endpoint này sẽ tự động có 'Authorization: Bearer ...'
    // Tôi đoán endpoint là '/auth/me' dựa trên cấu trúc backend
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};