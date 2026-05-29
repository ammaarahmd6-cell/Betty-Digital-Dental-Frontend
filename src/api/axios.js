import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL;
const isLocalhostApi = configuredApiUrl && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/api\/?$/i.test(configuredApiUrl);
const productionApiUrl = 'https://betty-digital-dental-backend.vercel.app/api';
const baseURL = import.meta.env.PROD && (!configuredApiUrl || isLocalhostApi)
  ? productionApiUrl
  : configuredApiUrl || 'http://localhost:5000/api';

const api = axios.create({
  baseURL
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
