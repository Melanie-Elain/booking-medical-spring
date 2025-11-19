// api/DoctorWorkspaceService.js (TẠO FILE NÀY)
import axiosInstance from './axiosConfig';

/**
 * Lấy hồ sơ bác sĩ (bảng bacsi) bằng user_id (bảng users)
 * API: GET /api/doctors/user/{userId}
 */
export const getDoctorProfileByUserId = (userId) => {
    return axiosInstance.get(`/doctors/user/${userId}`);
};

/**
 * Bác sĩ tự cập nhật hồ sơ của mình
 * API: PUT /api/doctors/{id}
 */
export const updateDoctorProfile = (doctorId, data) => {
    return axiosInstance.put(`/doctors/${doctorId}`, data);
};

/**
 * Lấy lịch HẸN (appointments) của bác sĩ (phân trang)
 * API: GET /api/doctors/{id}/appointments
 */
export const getDoctorAppointments = (doctorId, page = 0, size = 10) => {
    return axiosInstance.get(`/doctors/${doctorId}/appointments`, {
        params: {
            page: page,
            size: size
        }
    });
};

/**
 * Bác sĩ cập nhật trạng thái lịch hẹn (Xác nhận / Hủy)
 * API: PUT /api/doctors/appointments/{appointmentId}/status
 */
export const updateDoctorAppointmentStatus = (appointmentId, newStatus) => {
    const requestBody = {
        status: newStatus
    };
    return axiosInstance.put(`/doctors/appointments/${appointmentId}/status`, requestBody);
};

/**
 * Lấy lịch làm việc CÒN TRỐNG của bác sĩ (cho trang ScheduleManagement)
 * API: GET /api/doctors/schedules/{id}
 */
export const getDoctorSchedules = async (doctorId) => { 
    const response = await axiosInstance.get(`/doctors/schedules/${doctorId}`);
    console.log("Lịch làm việc (Workspace):", response.data);
    return response.data; // Trả về data
};