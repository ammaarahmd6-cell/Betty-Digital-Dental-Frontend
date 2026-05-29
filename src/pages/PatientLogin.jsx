import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function PatientLogin() {
  const { loginPatient } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await loginPatient(email, password);
      navigate('/patient/dashboard');
    } catch {
      Swal.fire('Login failed', 'Please check your patient email and password.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-screen patient-auth-screen">
      <Helmet><title>Patient Sign In | Betty Digital Dental Solutions</title></Helmet>
      <form className="login-card patient-auth-card" onSubmit={submit}>
        <span className="eyebrow">Patient Portal</span>
        <h1>Patient Sign In</h1>
        <p>Access your dental technology inquiry profile and send complete consultation requests.</p>
        <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <div className="password-control">
          <input className="form-control" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button className="btn btn-gradient w-100" disabled={loading}>{loading ? 'Signing in...' : 'Patient Sign In'}</button>
        <div className="portal-switch">
          <Link to="/patient/signup" className="btn btn-light-blue w-100">Create Patient Account</Link>
          <Link to="/admin/login" className="btn btn-outline-primary w-100">Admin Login</Link>
          <Link to="/" className="small-link">Back to website</Link>
        </div>
      </form>
    </section>
  );
}

export default PatientLogin;
