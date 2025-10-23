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

export default axiosClient;
