import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', 
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    
    if (token) {
      const cleanToken = token.replace(/\r?\n|\r/g, "").trim();
      config.headers["Authorization"] = `Bearer ${cleanToken}`;

    }
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

//axiosInstance.interceptors.response.use(
//  (response) => response, 
//  (error) => {
//    if (error.response && error.response.status === 401) {
//      localStorage.removeItem('jwtToken');
//      localStorage.removeItem('userName');
//      
//      window.location.href = '/login';
//    }
//    return Promise.reject(error);
//  }
//);

// Interceptor cho Response (CẬP NHẬT LOGIC XỬ LÝ LỖI 401)
axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    // Kiểm tra nếu lỗi là 401 (Unauthorized - Token sai hoặc hết hạn)
    if (error.response && error.response.status === 401) {
      
      // 1. Xóa tất cả thông tin xác thực
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole'); // Thêm dòng này

      // 2. Gửi sự kiện để các component khác (như Dashboard) biết
      window.dispatchEvent(new Event('authChange')); 

      // 3. Logic điều hướng thông minh
      const currentPath = window.location.pathname;

      // Nếu đang ở trang bác sĩ (workspace) hoặc trang login bác sĩ
      if (currentPath.startsWith('/doctor-workspace') || currentPath.startsWith('/doctor-login')) {
        // Chuyển hướng về trang login Bác sĩ
        if(currentPath !== '/doctor-login') { // Tránh reload vô hạn
          window.location.href = '/doctor-login';
        }
      } 
      // Nếu đang ở các trang khác (trang bệnh nhân) VÀ không phải đã ở /login
      else if (!currentPath.startsWith('/login')) {
        // Chuyển hướng về trang login Bệnh nhân
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;