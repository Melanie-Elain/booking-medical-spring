import axiosInstance from './axiosConfig'; // Dùng instance đã có token

/**
 * Lấy tất cả user
 */
export const getAllUsers = () => {
  return axiosInstance.get('/admin/users');
};

/**
 * Tạo user mới (Admin)
 */
export const createUser = (userData) => {
  return axiosInstance.post('/admin/users', userData);
};

/**
 * Cập nhật user (Admin)
 */
export const updateUser = (userId, userData) => {
  return axiosInstance.put(`/admin/users/${userId}`, userData);
};

/**
 * Xóa user (Admin)
 */
export const deleteUser = (userId) => {
  return axiosInstance.delete(`/admin/users/${userId}`);
};