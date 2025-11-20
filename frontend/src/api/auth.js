import axios from "axios";

// Đổi tên biến để rõ ràng
// const AUTH_API_URL = "http://localhost:8080/api/auth";
const AUTH_API_URL = "https://medical-booking-backend-f09f.onrender.com/api/auth";


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