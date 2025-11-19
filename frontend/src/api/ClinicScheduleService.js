import axiosInstance from './axiosConfig';

export const createClinicSchedule = (clinicId, scheduleDTO) => {
    return axiosInstance.post(`/clinics/${clinicId}/schedules`, scheduleDTO);
};

export const deleteScheduleSlot = (slotId) => {
    return axiosInstance.delete(`/clinics/schedules/${slotId}`);
};

export const updateScheduleSlot = (slotId, newTime) => {
    return axiosInstance.put(`/clinics/schedules/${slotId}`, { time: newTime });
};