import axiosInstance from './axiosConfig';

/**
 * Lấy lịch HẸN (appointments) của phòng khám (phân trang)
 * API: GET /api/clinics/{userId}/appointments
 */
export const getClinicAppointments = (userId, page = 0, size = 10) => {
    // Backend AppointmentService đã được sửa để nhận userId
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
 * (Giả sử bạn có endpoint này, nếu không, hãy dùng endpoint của admin)
 */
export const updateClinicAppointmentStatus = (appointmentId, newStatus) => {
    const requestBody = {
        status: newStatus
    };
    // LƯU Ý: Đảm bảo bạn có endpoint này
    // Nếu không, bạn có thể dùng chung endpoint của Admin
    // return axiosInstance.put(`/admin/appointments/${appointmentId}/status`, requestBody);
    return axiosInstance.put(`/clinics/appointments/${appointmentId}/status`, requestBody);
};