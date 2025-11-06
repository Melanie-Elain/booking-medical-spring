import axios from "axios";

// Đổi tên biến để rõ ràng
const AUTH_API_URL = "http://localhost:8080/api/auth";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (data) => {
  try {
    // response.data sẽ là { token: "...", fullName: "..." }
    const response = await axios.post(`${AUTH_API_URL}/login`, data);
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};