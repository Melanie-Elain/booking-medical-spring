import axiosInstance from './axiosConfig';

// Hàm helper chung
const getPaginated = (endpoint, page = 0, size = 10) => {
  return axiosInstance.get(`${endpoint}?page=${page}&size=${size}`);
};

// --- USER API ---
export const getAllUsers = (page, size) => getPaginated('/admin/users', page, size);
export const createUser = (userData) => axiosInstance.post('/admin/users', userData);
export const updateUser = (userId, userData) => axiosInstance.put(`/admin/users/${userId}`, userData);
export const deleteUser = (userId) => axiosInstance.delete(`/admin/users/${userId}`);

// --- SPECIALTY API ---
export const getAllSpecialtiesList = () => {
  return axiosInstance.get('/admin/specialties/all');
};
export const getAllSpecialties = (page, size) => getPaginated('/admin/specialties', page, size);
export const createSpecialty = (data) => axiosInstance.post('/admin/specialties', data);
export const updateSpecialty = (id, data) => axiosInstance.put(`/admin/specialties/${id}`, data);
export const deleteSpecialty = (id) => axiosInstance.delete(`/admin/specialties/${id}`);

// --- DOCTOR API ---
export const getAllDoctors = (page, size) => getPaginated('/admin/doctors', page, size);
export const createDoctor = (data) => axiosInstance.post('/admin/doctors', data);
export const updateDoctor = (id, data) => axiosInstance.put(`/admin/doctors/${id}`, data);
export const deleteDoctor = (id) => axiosInstance.delete(`/admin/doctors/${id}`);

// --- HOSPITAL API ---
export const getAllHospitals = (page, size) => getPaginated('/admin/hospitals', page, size);
export const createHospital = (data) => axiosInstance.post('/admin/hospitals', data);
export const updateHospital = (id, data) => axiosInstance.put(`/admin/hospitals/${id}`, data);
export const deleteHospital = (id) => axiosInstance.delete(`/admin/hospitals/${id}`);

// --- CLINIC API ---
export const getAllClinics = (page, size) => getPaginated('/admin/clinics', page, size);
export const createClinic = (data) => axiosInstance.post('/admin/clinics', data);
export const updateClinic = (id, data) => axiosInstance.put(`/admin/clinics/${id}`, data);
export const deleteClinic = (id) => axiosInstance.delete(`/admin/clinics/${id}`);

// --- APPOINTMENT API ---
export const getAllAppointments = (page, size) => getPaginated('/admin/appointments', page, size);
export const updateAppointmentStatus = (id, status) => {
  return axiosInstance.put(`/admin/appointments/${id}/status`, { status: status });
};