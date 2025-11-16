import axios from 'axios';

// 1. Tạo một "instance" (thể hiện) của Axios
const axiosInstance = axios.create({
  // URL gốc của tất cả API (trừ /register và /login)
  baseURL: 'http://localhost:8080/api', 
  timeout: 10000,
});

// 2. Đây là "Interceptor" (Bộ lọc Request)
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage trước mỗi lần gọi API
    const token = localStorage.getItem('jwtToken');
    
    // Nếu có token, tự động gắn nó vào Header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config; // Gửi request đi
  },
  (error) => {
    // Xử lý lỗi request
    return Promise.reject(error);
  }
);

// (Nâng cao) Thêm Interceptor cho Response để xử lý lỗi 401 (Token hết hạn)
axiosInstance.interceptors.response.use(
  (response) => response, // Trả về response nếu thành công
  (error) => {
    // Nếu lỗi là 401 (Unauthorized) -> token hết hạn
    if (error.response && error.response.status === 401) {
      // Xóa token cũ
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userName');
      
      // Chuyển hướng người dùng về trang login
      // (Dùng window.location vì chúng ta đang ở ngoài component)
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;