import axiosInstance from "./axiosConfig";

export const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post(`/auth/register`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, data);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

// export const checkExistPhone = async (phoneNumber) => {
//   try {
//     const response = await axiosInstance.post(`/auth/check-exist?phoneNumber=${phoneNumber}`);
//     return response.data; 
//   } catch (error) {
//     throw error;
//   }
// };
