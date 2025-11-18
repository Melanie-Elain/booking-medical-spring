import axiosInstance from './axiosConfig';

/**
 * Lấy lịch HẸN (appointments) của bệnh viện (phân trang)
 * API: GET /api/hospitals/{userId}/appointments
 */
export const getHospitalAppointments = (userId, page = 0, size = 10) => {
    // Backend AppointmentService đã được sửa để nhận userId
    return axiosInstance.get(`/hospitals/${userId}/appointments`, {
        params: {
            page: page,
            size: size
        }
    });
};

/**
 * Bệnh viện cập nhật trạng thái lịch hẹn (Xác nhận / Hủy)
 * API: PUT /api/hospitals/appointments/{appointmentId}/status
 */
export const updateHospitalAppointmentStatus = (appointmentId, newStatus) => {
    const requestBody = {
        status: newStatus
    };
    return axiosInstance.put(`/hospitals/appointments/${appointmentId}/status`, requestBody);
};