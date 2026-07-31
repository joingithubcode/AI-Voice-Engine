// import axios from 'axios';
// import Cookies from 'js-cookie';

// // ✅ Proxy URL - /api se start ho raha hai
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8000/api';

// console.log('🔗 API_URL:', API_URL);

// export const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 30000,
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('access_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log('📤 Request:', config.method?.toUpperCase(), config.baseURL + config.url);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   (response) => {
//     console.log('✅ Response:', response.status);
//     return response;
//   },
//   (error) => {
//     console.error('❌ API Error:', error.message);
//     if (error.response) {
//       console.error('❌ Status:', error.response.status);
//       console.error('❌ Data:', error.response.data);
//     }
//     if (error.response?.status === 401) {
//       Cookies.remove('access_token');
//       Cookies.remove('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('access_token');
      Cookies.remove('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);