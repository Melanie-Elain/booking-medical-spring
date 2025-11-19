import axiosInstance from "./axiosConfig";

// === 1. EXPORT LẺ TỪNG HÀM (Named Exports) ===
// Dùng cho các component mới: import { getAllClinicsList } from ...

export const getAllClinicsList = async () => {
    console.log("Fetching all clinics from API...");
    const response = await axiosInstance.get(`/clinics`);
    console.log("All Clinics Response:", response.data);
    return response.data;
};

export const getClinicById = async (clinicId) => {
    const response = await axiosInstance.get(`/clinics/${clinicId}`);
    console.log("Clinic By ID Response:", response.data);
    return response.data;
};

export const getClinicSchedules = async (clinicId) => {
    const response = await axiosInstance.get(`/clinics/${clinicId}/schedules`);
    console.log("Lịch làm việc phòng khám:", response.data);
    return response.data;
};

// === 2. EXPORT OBJECT (Compatibility) ===
// Giữ lại object này để code cũ (nếu có dùng clinicService.get...) vẫn chạy được
export const clinicService = {
    getAllClinicsList,
    getClinicById,
    getClinicSchedules
};