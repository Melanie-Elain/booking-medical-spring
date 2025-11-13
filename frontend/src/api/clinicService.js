import axiosInstance from "./axiosConfig";

export const clinicService = {
    getAllClinicsList: async () => {
        console.log("Fetching all clinics from API...");
        const response = await axiosInstance.get(`/clinics`);
        console.log("All Clinics Response:", response.data);
        return response.data;
    },

    getClinicById: async (clinicId) => {
        const response = await axiosInstance.get(`/clinics/${clinicId}`);
        console.log("Clinic By ID Response:", response.data);
        return response.data;
    },
    getClinicSchedules: async (clinicId) => {
        const response = await axiosInstance.get(`/clinics/${clinicId}/schedules`);
        console.log("Lịch làm việc phòng khám:", response.data)
        return response.data;
    },

    bookAppointment: async (appointmentData) => {
        const response = await axiosInstance.post(`/booking/clinic`, appointmentData);
        return response.data;
    }


};