import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function PatientSignup() {
  const { registerPatient } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const submit = async (payload) => {
    try {
      await registerPatient(payload);
      Swal.fire('Account created', 'Your patient profile is complete and ready.', 'success');
      navigate('/patient/dashboard');
    } catch (error) {
      Swal.fire('Signup failed', error.response?.data?.message || error.message || 'Please check all required fields.', 'error');
    }
  };

  return (
    <section className="patient-signup-page">
      <Helmet><title>Patient Sign Up | Betty Digital Dental Solutions</title></Helmet>
      <div className="container">
        <div className="auth-panel">
          <div className="auth-copy">
            <span className="eyebrow">Patient Registration</span>
            <h1>Create Patient Account</h1>
            <p>Fill your complete required profile so our team can understand your dental need, location, and consultation request properly.</p>
            <Link to="/patient/login" className="btn btn-light-blue">Already have an account?</Link>
          </div>
          <form className="patient-form" onSubmit={handleSubmit(submit)}>
            <div className="row g-3">
              <Field className="col-md-6" label="Full Name" error={errors.full_name}><input className="form-control" {...register('full_name', { required: true })} /></Field>
              <Field className="col-md-6" label="Email" error={errors.email}><input className="form-control" type="email" {...register('email', { required: true })} /></Field>
              <Field className="col-md-6" label="Password" error={errors.password}>
                <div className="password-control">
                  <input className="form-control" type={showPassword ? 'text' : 'password'} {...register('password', { required: true, minLength: 6 })} />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </Field>
              <Field className="col-md-6" label="Phone / WhatsApp" error={errors.phone}><input className="form-control" {...register('phone', { required: true })} /></Field>
              <Field className="col-md-6" label="Country" error={errors.country}><input className="form-control" {...register('country', { required: true })} /></Field>
              <Field className="col-md-6" label="City" error={errors.city}><input className="form-control" {...register('city', { required: true })} /></Field>
              <Field className="col-md-6" label="Date of Birth" error={errors.date_of_birth}><input className="form-control" type="date" {...register('date_of_birth', { required: true })} /></Field>
              <Field className="col-md-6" label="Gender" error={errors.gender}>
                <select className="form-select" {...register('gender', { required: true })}>
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field className="col-12" label="Address" error={errors.address}><input className="form-control" {...register('address', { required: true })} /></Field>
              <Field className="col-md-6" label="Medical History" error={errors.medical_history}><textarea className="form-control" rows="4" {...register('medical_history', { required: true })} placeholder="Allergies, diabetes, medication, previous treatment..." /></Field>
              <Field className="col-md-6" label="Dental Concern"><textarea className="form-control" rows="4" {...register('dental_concern')} placeholder="Implant, crown, aligner, scan, restoration, consultation..." /></Field>
              <Field className="col-12" label="Preferred Service"><input className="form-control" {...register('preferred_service')} placeholder="Digital scan, consultation, CAD/CAM case, surgical guide..." /></Field>
              <div className="col-12"><button className="btn btn-gradient btn-lg w-100" disabled={isSubmitting}>{isSubmitting ? 'Creating account...' : 'Create Patient Account'}</button></div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, className, children }) {
  return (
    <div className={className}>
      <label className="form-label">{label}</label>
      {children}
      {error && <small className="text-danger">{label} is required.</small>}
    </div>
  );
}

export default PatientSignup;
