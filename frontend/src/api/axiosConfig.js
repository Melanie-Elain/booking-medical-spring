import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'; 

const axiosInstance = axios.create({
  baseURL: baseURL,
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