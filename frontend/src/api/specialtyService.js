import axiosInstance from "./axiosConfig";

export const SpecialtyService = {
    
    getAllSpecialtiesList: async () => {
        const response = await axiosInstance.get(`/specialties`);
        console.log("All Specialties Response:", response.data);
        return response.data;
    },
    getSpecialtyById: async (specialtyId) => {
        const response = await axiosInstance.get(`/specialties/${specialtyId}`);
        console.log("Specialty By ID Response:", response.data);
        return response.data;
    }
};