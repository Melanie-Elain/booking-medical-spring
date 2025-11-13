import axiosInstance from "./axiosConfig";

export const appointmentService = {
    bookDoctorAppointment: async (appointmentData) => {
        console.log("Booking appointment with data:", appointmentData);
        const response = await axiosInstance.post(`/booking/doctor`, appointmentData);
        return response.data;
    }
};