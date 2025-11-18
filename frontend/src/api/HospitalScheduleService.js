import axiosInstance from './axiosConfig';

/**
 * Tạo lịch làm việc mới (Bệnh viện)
 * API: POST /api/hospitals/{id}/schedules
 */
export const createHospitalSchedule = (hospitalId, scheduleDTO) => {
    return axiosInstance.post(`/hospitals/${hospitalId}/schedules`, scheduleDTO);
};

/**
 * Xóa một khung giờ (Bệnh viện)
 * API: DELETE /api/hospitals/schedules/{slotId}
 */
export const deleteScheduleSlot = (slotId) => {
    // Lưu ý: Đảm bảo API của bạn khớp (có thể là /hospitals/schedules/...)
    return axiosInstance.delete(`/hospitals/schedules/${slotId}`);
};

/**
 * Sửa một khung giờ (Bệnh viện)
 * API: PUT /api/hospitals/schedules/{slotId}
 */
export const updateScheduleSlot = (slotId, newTime) => {
    // Lưu ý: Đảm bảo API của bạn khớp (có thể là /hospitals/schedules/...)
    return axiosInstance.put(`/hospitals/schedules/${slotId}`, { time: newTime });
};