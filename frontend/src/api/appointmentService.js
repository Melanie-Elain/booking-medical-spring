import axiosInstance from "./axiosConfig";

export const appointmentService = {

    bookDoctorAppointment: async (appointmentData) => { 
        console.log("Booking Doctor appointment:", appointmentData);
        const response = await axiosInstance.post(`/booking/doctor`, appointmentData);
        return response.data; 
    },

    bookHospitalAppointment: async (appointmentData) => { 
        console.log("Booking Hospital appointment:", appointmentData);
        const response = await axiosInstance.post(`/booking/hospital`, appointmentData);
        return response.data;
    },

    bookClinicAppointment: async (appointmentData) => {
        console.log("Booking Clinic appointment:", appointmentData);
        const response = await axiosInstance.post(`/booking/clinic`, appointmentData);
        return response.data;
    },

    confirmPaymentStatus: async (confirmationPayload) => {
        console.log("Confirming payment status:", confirmationPayload);
        const response = await axiosInstance.post(`/payment/confirm-status`, confirmationPayload);
        console.log("Confirming payment status response:", response);
        return response.data;
    },

    getAppointmentDetails: async (appointmentId) => { 
        console.log("Fetching appointment details for ID:", appointmentId);
        
        // Sử dụng backticks (`) cho phép chèn biến vào chuỗi URL
        const response = await axiosInstance.get(`/api/appointments/${appointmentId}`);
        
        return response.data;
    },
};