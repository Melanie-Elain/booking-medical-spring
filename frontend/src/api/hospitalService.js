// import axiosInstance from "./axiosConfig";

// export const HospitalService = {
//     getAllHospitalsList: async () => {
//         const response = await axiosInstance.get(`/hospitals`);
//         return response.data;
//     },

//     getHospitalById: async (hospitalId) => {
//         const response = await axiosInstance.get(`/hospitals/${hospitalId}`);
//         console.log("Hospital By ID Response:", response.data);
//         return response.data;
//     },

//     getHospitalSchedules: async (hospitalId) => {
//         const response = await axiosInstance.get(`/hospitals/${hospitalId}/schedules`);
//         console.log("Lịch làm việc bệnh viện:", response.data);
//         return response.data;
//     },

    

// };

import axiosInstance from "./axiosConfig";

/**
 * Lấy danh sách tất cả bệnh viện
 */
export const getAllHospitalsList = async () => {
    const response = await axiosInstance.get(`/hospitals`);
    return response.data;
};

/**
 * Lấy chi tiết một bệnh viện (dùng cho trang Hồ sơ)
 */
export const getHospitalById = async (hospitalId) => {
    const response = await axiosInstance.get(`/hospitals/${hospitalId}`);
    console.log("Hospital By ID Response:", response.data);
    return response.data;
};

/**
 * Lấy lịch làm việc (còn trống) của bệnh viện
 */
export const getHospitalSchedules = async (hospitalId) => {
    const response = await axiosInstance.get(`/hospitals/${hospitalId}/schedules`);
    console.log("Lịch làm việc bệnh viện:", response.data);
    return response.data;
};


// Giữ lại object này để tương thích với bất kỳ code cũ nào có thể đang dùng
export const HospitalService = {
    getAllHospitalsList: getAllHospitalsList,
    getHospitalById: getHospitalById,
    getHospitalSchedules: getHospitalSchedules
};