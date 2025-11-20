import axiosInstance from './axiosConfig';


export const createHospitalSchedule = (hospitalId, scheduleDTO) => {
    return axiosInstance.post(`/hospitals/${hospitalId}/schedules`, scheduleDTO);
};


export const deleteScheduleSlot = (slotId) => {
    return axiosInstance.delete(`/hospitals/schedules/${slotId}`);
};

export const updateScheduleSlot = (slotId, newTime) => {
    return axiosInstance.put(`/hospitals/schedules/${slotId}`, { time: newTime });
};