import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

function PatientRoute({ children }) {
  const { isPatientAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;
  if (!isPatientAuthenticated) return <Navigate to="/patient/login" replace />;

  return children;
}

export default PatientRoute;
