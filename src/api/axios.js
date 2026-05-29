import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const isPatientRoute = config.url?.startsWith('/patients');
  const token = isPatientRoute ? localStorage.getItem('bd_patient_token') : localStorage.getItem('bd_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
