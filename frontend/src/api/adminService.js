import axiosInstance from './axiosConfig'; // Dùng instance đã có token

// --- USER API ---
export const getAllUsers = () => {
  return axiosInstance.get('/admin/users');
};
export const createUser = (userData) => {
  return axiosInstance.post('/admin/users', userData);
};
export const updateUser = (userId, userData) => {
  return axiosInstance.put(`/admin/users/${userId}`, userData);
};
export const deleteUser = (userId) => {
  return axiosInstance.delete(`/admin/users/${userId}`);
};

// --- SPECIALTY API ---
export const getAllSpecialties = () => {
  return axiosInstance.get('/admin/specialties');
};
export const createSpecialty = (specialtyData) => {
  return axiosInstance.post('/admin/specialties', specialtyData);
};
export const updateSpecialty = (id, specialtyData) => {
  return axiosInstance.put(`/admin/specialties/${id}`, specialtyData);
};
export const deleteSpecialty = (id) => {
  return axiosInstance.delete(`/admin/specialties/${id}`);
};

// --- DOCTOR API ---
export const getAllDoctors = () => {
  return axiosInstance.get('/admin/doctors');
};
export const createDoctor = (doctorData) => {
  return axiosInstance.post('/admin/doctors', doctorData);
};
export const updateDoctor = (id, doctorData) => {
  return axiosInstance.put(`/admin/doctors/${id}`, doctorData);
};
export const deleteDoctor = (id) => {
  return axiosInstance.delete(`/admin/doctors/${id}`);
};

// --- HOSPITAL API ---
export const getAllHospitals = () => {
  return axiosInstance.get('/admin/hospitals');
};
export const createHospital = (hospitalData) => {
  return axiosInstance.post('/admin/hospitals', hospitalData);
};
export const updateHospital = (id, hospitalData) => {
  return axiosInstance.put(`/admin/hospitals/${id}`, hospitalData);
};
export const deleteHospital = (id) => {
  return axiosInstance.delete(`/admin/hospitals/${id}`);
};

// --- CLINIC API ---
export const getAllClinics = () => {
  return axiosInstance.get('/admin/clinics');
};
export const createClinic = (clinicData) => {
  return axiosInstance.post('/admin/clinics', clinicData);
};
export const updateClinic = (id, clinicData) => {
  return axiosInstance.put(`/admin/clinics/${id}`, clinicData);
};
export const deleteClinic = (id) => {
  return axiosInstance.delete(`/admin/clinics/${id}`);
};

// --- APPOINTMENT API ---
export const getAllAppointments = () => {
  return axiosInstance.get('/admin/appointments');
};
export const updateAppointmentStatus = (id, status) => {
  // Gửi đi object { status: "..." }
  return axiosInstance.put(`/admin/appointments/${id}/status`, { status: status });
};