import axios from 'axios';

const axiosInstance = axios.create({
    // Nếu có biến môi trường thì dùng, không thì dùng localhost (để chạy máy nhà vẫn được)
    baseURL: 'https://medical-booking-backend-f09f.onrender.com/api', 
    headers: {
        'Content-Type': 'application/json',
    },
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

axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userName');
      
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;