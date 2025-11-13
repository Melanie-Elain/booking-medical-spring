import axiosInstance from "./axiosConfig";

export const HospitalService = {
    getAllHospitalsList: async () => {
        const response = await axiosInstance.get(`/hospitals`);
        return response.data;
    },

    getHospitalById: async (hospitalId) => {
        const response = await axiosInstance.get(`/hospitals/${hospitalId}`);
        console.log("Hospital By ID Response:", response.data);
        return response.data;
    },

    getHospitalSchedules: async (hospitalId) => {
        const response = await axiosInstance.get(`/hospitals/${hospitalId}/schedules`);
        console.log("Lịch làm việc bệnh viện:", response.data);
        return response.data;
    },

    bookAppointment: async (appointmentData) => {
        const response = await axiosInstance.post(`/booking/hospital`, appointmentData);
        return response.data;
    }

};