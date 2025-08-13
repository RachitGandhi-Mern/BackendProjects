// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://backendprojects-9fw1.onrender.com", 
//   withCredentials: true,
// });

// export default API;



import axios from 'axios';

// API base URL - apna backend URL yahan dal do
const API = axios.create({
  baseURL: 'https://backendprojects-9fw1.onrender.com', // Ya jo bhi aapka backend URL hai
  timeout: 10000, // 10 second timeout
});

// Request interceptor - har request mein token automatically add kar deta hai
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API: Adding token to request headers');
    } else {
      console.log('API: No token found for request');
    }
    return config;
  },
  (error) => {
    console.error('API: Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle token expiry automatically
API.interceptors.response.use(
  (response) => {
    console.log(`API: ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('API: Response error:', error.response?.status, error.message);
    
    // Token expired ya invalid hai
    if (error.response?.status === 401) {
      console.log('API: Token expired, removing from localStorage');
      localStorage.removeItem('token');
      
      // Login page par redirect (sirf agar abhi login page par nahi hain)
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default API;

