import axiosInstance from "./axiosConfig";

/**
 * Lấy tất cả chuyên khoa
 * API: GET /api/specialties
 * (Export trực tiếp để component DoctorProfileManagement có thể import)
 */
export const getAllSpecialties = async () => {
    const response = await axiosInstance.get(`/specialties`);
    console.log("All Specialties Response:", response.data);
    return response.data;
};

/**
 * (Hàm này chưa được dùng, nhưng bạn có thể giữ lại)
 * Lấy chi tiết một chuyên khoa
 */
export const getSpecialtyById = async (specialtyId) => {
    const response = await axiosInstance.get(`/specialties/${specialtyId}`);
    console.log("Specialty By ID Response:", response.data);
    return response.data;
};

// (Bạn có thể xóa object này nếu không dùng, 
//  vì chúng ta đã export trực tiếp các hàm ở trên)
export const SpecialtyService = {
    getAllSpecialtiesList: getAllSpecialties, // Giữ lại để tương thích
    getSpecialtyById: getSpecialtyById,
};