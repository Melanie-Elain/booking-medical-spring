import axiosInstance from './axiosConfig';

/**
 * Lấy lịch HẸN (appointments) của phòng khám (phân trang)
 * API: GET /api/clinics/{userId}/appointments
 */
export const getClinicAppointments = (userId, page = 0, size = 10) => {
    return axiosInstance.get(`/clinics/${userId}/appointments`, {
        params: {
            page: page,
            size: size
        }
    });
};

/**
 * Phòng khám cập nhật trạng thái lịch hẹn (Xác nhận / Hủy)
 * API: PUT /api/clinics/appointments/{appointmentId}/status
 */
export const updateClinicAppointmentStatus = (appointmentId, newStatus) => {
    const requestBody = {
        status: newStatus
    };
    return axiosInstance.put(`/clinics/appointments/${appointmentId}/status`, requestBody);
};

// === CÁC HÀM BẠN ĐANG THIẾU (Đã bổ sung) ===

/**
 * Lấy hồ sơ phòng khám (bảng phongkham) bằng user_id (bảng users)
 * API: GET /api/clinics/user/{userId}
 */
export const getClinicProfileByUserId = (userId) => {
    return axiosInstance.get(`/clinics/user/${userId}`);
};

/**
 * Phòng khám tự cập nhật hồ sơ của mình
 * API: PUT /api/clinics/{id}
 */
export const updateClinicProfile = (clinicId, data) => {
    return axiosInstance.put(`/clinics/${clinicId}`, data);
};