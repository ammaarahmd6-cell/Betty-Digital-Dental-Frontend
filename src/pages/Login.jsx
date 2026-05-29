import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { ownerProfile } from '../data/siteData';
import SmartImage from '../components/SmartImage';
import { fallbackImages } from '../data/imageFallbacks';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('ammaarahmd6@gmail.com');
  const [password, setPassword] = useState('Laddiadmin@3565');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      Swal.fire('Login failed', 'Please check your admin credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-screen">
      <Helmet><title>Admin Login | Betty Digital Dental Solutions</title></Helmet>
      <form className="login-card" onSubmit={submit}>
        <div className="login-profile">
          <SmartImage src={ownerProfile.image} fallback={fallbackImages.clinic} alt="Betty Wong admin profile" />
          <div>
            <strong>{ownerProfile.name}</strong>
            <span>{ownerProfile.currentCity}, {ownerProfile.location}</span>
          </div>
        </div>
        <span className="eyebrow">Admin Panel</span>
        <h1>{ownerProfile.name} Admin Login</h1>
        <p>This sign in is only for Betty Wong, the business admin. Patients should use the patient portal below.</p>
        <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <div className="password-control">
          <input className="form-control" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button className="btn btn-gradient w-100" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        <div className="portal-switch">
          <Link to="/patient/login" className="btn btn-light-blue w-100">Patient Sign In</Link>
          <Link to="/patient/signup" className="btn btn-outline-primary w-100">Create Patient Account</Link>
          <Link to="/" className="small-link">Back to website</Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
