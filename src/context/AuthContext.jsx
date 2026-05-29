import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const adminToken = localStorage.getItem('bd_admin_token');
      const patientToken = localStorage.getItem('bd_patient_token');
      if (!adminToken && !patientToken) {
        setLoading(false);
        return;
      }

      await Promise.all([
        adminToken
          ? api.get('/auth/profile').then(({ data }) => setAdmin(data.data)).catch(() => localStorage.removeItem('bd_admin_token'))
          : Promise.resolve(),
        patientToken
          ? api.get('/patients/me').then(({ data }) => setPatient(data.data)).catch(() => localStorage.removeItem('bd_patient_token'))
          : Promise.resolve()
      ]);
      setLoading(false);
    };

    loadProfile();
  }, []);

  const loginAdmin = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('bd_admin_token', data.token);
    setAdmin(data.admin);
    return data.admin;
  };

  const logoutAdmin = () => {
    localStorage.removeItem('bd_admin_token');
    setAdmin(null);
  };

  const registerPatient = async (payload) => {
    const { data } = await api.post('/patients/register', payload);
    localStorage.setItem('bd_patient_token', data.token);
    setPatient(data.patient);
    return data.patient;
  };

  const loginPatient = async (email, password) => {
    const { data } = await api.post('/patients/login', { email, password });
    localStorage.setItem('bd_patient_token', data.token);
    setPatient(data.patient);
    return data.patient;
  };

  const updatePatient = async (payload) => {
    const { data } = await api.put('/patients/me', payload);
    setPatient(data.data);
    return data.data;
  };

  const logoutPatient = () => {
    localStorage.removeItem('bd_patient_token');
    setPatient(null);
  };

  const value = useMemo(() => ({
    admin,
    patient,
    loading,
    login: loginAdmin,
    loginAdmin,
    logout: logoutAdmin,
    logoutAdmin,
    registerPatient,
    loginPatient,
    updatePatient,
    logoutPatient,
    isAuthenticated: Boolean(admin),
    isPatientAuthenticated: Boolean(patient)
  }), [admin, patient, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
