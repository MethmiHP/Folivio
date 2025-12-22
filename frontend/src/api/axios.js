import axios from "axios";

// For production
const PROD_API_URL = "https://portfolio-backend-production-90e.up.railway.app";

// For development
const DEV_API_URL = "http://localhost:5000";

// Determine the base URL based on environment
const getBaseUrl = () => {
  // Check for Vercel environment
  if (import.meta.env.VITE_VERCEL_ENV === 'production') {
    return PROD_API_URL;
  }
  // Check for local development
  return window.location.hostname === 'localhost' ? DEV_API_URL : PROD_API_URL;
};

// Get the base URL from environment variables or fall back to getBaseUrl()
let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
                   import.meta.env.VITE_API_URL || 
                   getBaseUrl();

// Ensure the URL is properly formatted (remove trailing slashes)
API_BASE_URL = API_BASE_URL.replace(/\/+$/, '');

// Always add /api prefix if not already present
const API_PREFIX = '/api';
if (!API_BASE_URL.endsWith(API_PREFIX)) {
  // Only add /api if it's not already in the URL
  if (!API_BASE_URL.includes(API_PREFIX)) {
    API_BASE_URL += API_PREFIX;
  }
}

console.log('Environment:', import.meta.env.MODE);
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
