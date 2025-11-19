// import axiosInstance from './axiosConfig';

// /**
//  * Lấy lịch HẸN (appointments) của bệnh viện (phân trang)
//  * API: GET /api/hospitals/{userId}/appointments
//  */
// export const getHospitalAppointments = (userId, page = 0, size = 10) => {
//     // Backend AppointmentService đã được sửa để nhận userId
//     return axiosInstance.get(`/hospitals/${userId}/appointments`, {
//         params: {
//             page: page,
//             size: size
//         }
//     });
// };

// /**
//  * Bệnh viện cập nhật trạng thái lịch hẹn (Xác nhận / Hủy)
//  * API: PUT /api/hospitals/appointments/{appointmentId}/status
//  */
// export const updateHospitalAppointmentStatus = (appointmentId, newStatus) => {
//     const requestBody = {
//         status: newStatus
//     };
//     return axiosInstance.put(`/hospitals/appointments/${appointmentId}/status`, requestBody);
// };


// /**
//  * Lấy hồ sơ bệnh viện (bảng benhvien) bằng user_id (bảng users)
//  * API: GET /api/hospitals/user/{userId}
//  */
// export const getHospitalProfileByUserId = (userId) => {
//     return axiosInstance.get(`/hospitals/user/${userId}`);
// };

// /**
//  * Bệnh viện tự cập nhật hồ sơ của mình
//  * API: PUT /api/hospitals/{id}
//  */
// export const updateHospitalProfile = (hospitalId, data) => {
//     return axiosInstance.put(`/hospitals/${hospitalId}`, data);
// };

import axiosInstance from './axiosConfig';

// --- GET INFO ---

export const getHospitalProfileByUserId = (userId) => {
    return axiosInstance.get(`/hospitals/user/${userId}`);
};

export const updateHospitalProfile = (hospitalId, data) => {
    return axiosInstance.put(`/hospitals/${hospitalId}`, data);
};

// --- APPOINTMENTS (LỊCH HẸN) ---

export const getHospitalAppointments = (userId, page = 0, size = 10) => {
    return axiosInstance.get(`/hospitals/${userId}/appointments`, {
        params: { page, size }
    });
};

export const updateHospitalAppointmentStatus = (appointmentId, newStatus) => {
    const requestBody = { status: newStatus };
    // Gọi vào Controller Bệnh viện
    return axiosInstance.put(`/hospitals/appointments/${appointmentId}/status`, requestBody);
};

/**
 * HỦY LỊCH (Mới)
 * 👉 Đã sửa đường dẫn về: /hospitals/appointments/...
 */
export const cancelHospitalAppointment = (appointmentId) => {
    // Gọi vào Controller Bệnh viện
    return axiosInstance.put(`/hospitals/appointments/${appointmentId}/cancel`);
};