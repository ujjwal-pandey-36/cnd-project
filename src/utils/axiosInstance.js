import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Update as needed
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: request interceptor to include token if using auth
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or sessionStorage / Redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios INSTANCE error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
