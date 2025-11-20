import axiosInstance from './axiosConfig';

/**
 * Tạo lịch làm việc mới (LichTong + LichGio)
 * API: POST /api/doctors/{id}/schedules
 * @param {number} doctorId - ID thật của bác sĩ (ví dụ: 1)
 * @param {object} scheduleDTO - { date, timeSlots }
 */
export const createDoctorSchedule = (doctorId, scheduleDTO) => {
    return axiosInstance.post(`/doctors/${doctorId}/schedules`, scheduleDTO);
};

/**
 * Xóa một khung giờ
 * API: DELETE /api/doctors/schedules/{slotId}
 * @param {number} slotId - ID của LichGio
 */
export const deleteScheduleSlot = (slotId) => {
    return axiosInstance.delete(`/doctors/schedules/${slotId}`);
};

/**
 * Sửa một khung giờ
 * API: PUT /api/doctors/schedules/{slotId}
 * @param {number} slotId - ID của LichGio
 * @param {string} newTime - "09:00 - 09:30"
 */
export const updateScheduleSlot = (slotId, newTime) => {
    return axiosInstance.put(`/doctors/schedules/${slotId}`, { time: newTime });
};