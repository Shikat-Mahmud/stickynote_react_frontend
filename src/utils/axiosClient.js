import axios from 'axios';
import { apiBaseUrl } from '../config';

const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

// Automatically attach token if present
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👇 Add helper for FormData PUT/PATCH
axiosClient.putForm = (url, formData, config = {}) => {
  if (formData instanceof FormData) {
    formData.append('_method', 'PUT');
    return axiosClient.post(url, formData, {
      ...config,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
  return axiosClient.put(url, formData, config);
};

export default axiosClient;
