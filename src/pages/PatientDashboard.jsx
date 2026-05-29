import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaCalendarAlt, FaCheckCircle, FaClipboardList, FaFileMedical, FaHistory, FaSignOutAlt, FaUserEdit, FaWhatsapp } from 'react-icons/fa';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { contact, fallbackProducts, ownerProfile, services } from '../data/siteData';

const requiredProfileFields = ['full_name', 'phone', 'country', 'city', 'address', 'date_of_birth', 'gender', 'medical_history'];

function PatientDashboard() {
  const { patient, updatePatient, logoutPatient } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const profileForm = useForm({ values: patient || {} });
  const requestForm = useForm({
    defaultValues: {
      request_type: 'consultation',
      preferred_contact: 'WhatsApp',
      interested_product: patient?.preferred_service || '',
      message: patient?.dental_concern || '',
      appointment_date: ''
    }
  });

  const completion = useMemo(() => {
    const completed = requiredProfileFields.filter((field) => Boolean(String(patient?.[field] || '').trim())).length;
    return Math.round((completed / requiredProfileFields.length) * 100);
  }, [patient]);

  const recentProducts = fallbackProducts.slice(0, 4);

  const loadRequests = async () => {
    setLoadingRequests(true);
    try {
      const { data } = await api.get('/patients/inquiries');
      setRequests(data.data || []);
    } catch {
      setRequests([]);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const saveProfile = async (payload) => {
    try {
      await updatePatient(payload);
      Swal.fire('Profile updated', 'Your patient profile has been saved.', 'success');
    } catch {
      Swal.fire('Update failed', 'Please check all required profile fields.', 'error');
    }
  };

  const sendRequest = async (payload) => {
    try {
      await api.post('/patients/inquiries', payload);
      Swal.fire('Request sent', 'Your consultation request has been sent to Betty Wong.', 'success');
      requestForm.reset({ request_type: 'consultation', preferred_contact: 'WhatsApp', interested_product: '', message: '', appointment_date: '' });
      await loadRequests();
      setActiveTab('history');
    } catch (error) {
      Swal.fire('Request failed', error.response?.data?.message || 'Please complete the request form.', 'error');
    }
  };

  const logout = () => {
    logoutPatient();
    navigate('/patient/login');
  };

  return (
    <>
      <Helmet><title>Patient Portal | Betty Digital Dental Solutions</title></Helmet>
      <section className="patient-portal">
        <aside className="patient-sidebar">
          <div className="patient-brand">
            <span>Patient Portal</span>
            <strong>Betty Digital</strong>
          </div>
          <div className="patient-mini-card">
            <div className="patient-avatar">{patient?.full_name?.charAt(0) || 'P'}</div>
            <strong>{patient?.full_name}</strong>
            <span>{patient?.email}</span>
          </div>
          <nav>
            <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}><FaClipboardList /> Overview</button>
            <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}><FaUserEdit /> Profile</button>
            <button className={activeTab === 'request' ? 'active' : ''} onClick={() => setActiveTab('request')}><FaFileMedical /> New Request</button>
            <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}><FaHistory /> My Requests</button>
          </nav>
          <button className="btn btn-light w-100 mt-auto" onClick={logout}><FaSignOutAlt /> Logout</button>
        </aside>

        <main className="patient-main">
          <div className="patient-topbar">
            <div>
              <span className="eyebrow">Welcome Back</span>
              <h1>{patient?.full_name}</h1>
              <p>{ownerProfile.bio}. Your profile and requests stay organized here.</p>
            </div>
            <a className="btn btn-gradient" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp Betty</a>
          </div>

          {activeTab === 'overview' && (
            <div className="patient-grid">
              <div className="patient-stat"><FaCheckCircle /><span>Profile Completion</span><strong>{completion}%</strong></div>
              <div className="patient-stat"><FaClipboardList /><span>Total Requests</span><strong>{requests.length}</strong></div>
              <div className="patient-stat"><FaCalendarAlt /><span>Preferred Contact</span><strong>{patient?.phone ? 'WhatsApp' : 'Not Set'}</strong></div>
              <div className="patient-card wide">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <div>
                    <h3>Profile Status</h3>
                    <p>Complete profile data helps Betty Wong respond with the right dental solution.</p>
                  </div>
                  <button className="btn btn-light-blue" onClick={() => setActiveTab('profile')}>Edit Profile</button>
                </div>
                <div className="progress patient-progress"><div style={{ width: `${completion}%` }} /></div>
                <div className="profile-checklist">
                  {requiredProfileFields.map((field) => <span key={field} className={patient?.[field] ? 'done' : ''}>{labelize(field)}</span>)}
                </div>
              </div>
              <div className="patient-card">
                <h3>Quick Request</h3>
                <p>Need scanner, CAD/CAM, milling, 3D printing, zirconia, or lab support?</p>
                <button className="btn btn-gradient w-100" onClick={() => setActiveTab('request')}>Create Request</button>
              </div>
              <div className="patient-card wide">
                <h3>Recommended Solutions</h3>
                <div className="patient-product-list">
                  {recentProducts.map((product) => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                      <strong>{product.product_name}</strong>
                      <span>{product.category}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <form className="patient-card patient-form" onSubmit={profileForm.handleSubmit(saveProfile)}>
              <SectionHeader title="Complete Required Profile" text="Keep this information accurate before sending requests." />
              <div className="row g-3">
                <Field className="col-md-6" label="Full Name"><input className="form-control" {...profileForm.register('full_name', { required: true })} /></Field>
                <Field className="col-md-6" label="Email"><input className="form-control" value={patient?.email || ''} disabled /></Field>
                <Field className="col-md-6" label="Phone / WhatsApp"><input className="form-control" {...profileForm.register('phone', { required: true })} /></Field>
                <Field className="col-md-6" label="Country"><input className="form-control" {...profileForm.register('country', { required: true })} /></Field>
                <Field className="col-md-6" label="City"><input className="form-control" {...profileForm.register('city', { required: true })} /></Field>
                <Field className="col-md-6" label="Date of Birth"><input className="form-control" type="date" {...profileForm.register('date_of_birth', { required: true })} /></Field>
                <Field className="col-md-6" label="Gender">
                  <select className="form-select" {...profileForm.register('gender', { required: true })}>
                    <option value="">Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
                <Field className="col-md-6" label="Preferred Service">
                  <select className="form-select" {...profileForm.register('preferred_service')}>
                    <option value="">Select service</option>
                    {services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}
                  </select>
                </Field>
                <Field className="col-12" label="Address"><input className="form-control" {...profileForm.register('address', { required: true })} /></Field>
                <Field className="col-md-6" label="Medical History"><textarea className="form-control" rows="5" {...profileForm.register('medical_history', { required: true })} /></Field>
                <Field className="col-md-6" label="Dental Concern"><textarea className="form-control" rows="5" {...profileForm.register('dental_concern')} /></Field>
                <div className="col-12"><button className="btn btn-gradient" disabled={profileForm.formState.isSubmitting}>{profileForm.formState.isSubmitting ? 'Saving...' : 'Save Profile'}</button></div>
              </div>
            </form>
          )}

          {activeTab === 'request' && (
            <form className="patient-card patient-form" onSubmit={requestForm.handleSubmit(sendRequest)}>
              <SectionHeader title="New Consultation Request" text="Send a detailed request for products, services, cases, workflow setup, or after-sales support." />
              <div className="row g-3">
                <Field className="col-md-6" label="Request Type">
                  <select className="form-select" {...requestForm.register('request_type', { required: true })}>
                    <option value="consultation">Consultation</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="case-support">Dental Case Support</option>
                    <option value="after-sales">After-Sales Support</option>
                    <option value="training">Training</option>
                  </select>
                </Field>
                <Field className="col-md-6" label="Preferred Contact">
                  <select className="form-select" {...requestForm.register('preferred_contact', { required: true })}>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                  </select>
                </Field>
                <Field className="col-md-6" label="Product / Service Interest">
                  <select className="form-select" {...requestForm.register('interested_product', { required: true })}>
                    <option value="">Select product or service</option>
                    {fallbackProducts.slice(0, 40).map((product) => <option key={product.id} value={product.product_name}>{product.product_name}</option>)}
                    {services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}
                  </select>
                </Field>
                <Field className="col-md-6" label="Preferred Appointment Date"><input className="form-control" type="date" {...requestForm.register('appointment_date')} /></Field>
                <Field className="col-12" label="Message"><textarea className="form-control" rows="7" placeholder="Tell us your lab/clinic need, target equipment, budget range, current workflow, or technical issue." {...requestForm.register('message', { required: true })} /></Field>
                <div className="col-12"><button className="btn btn-gradient btn-lg w-100" disabled={requestForm.formState.isSubmitting}>{requestForm.formState.isSubmitting ? 'Sending...' : 'Send Request to Betty Wong'}</button></div>
              </div>
            </form>
          )}

          {activeTab === 'history' && (
            <div className="patient-card">
              <SectionHeader title="My Requests" text="Track requests sent from your patient portal." />
              <div className="table-responsive">
                <table className="table patient-table">
                  <thead><tr><th>Date</th><th>Interest</th><th>Type</th><th>Status</th><th>Message</th></tr></thead>
                  <tbody>
                    {loadingRequests && <tr><td colSpan="5">Loading requests...</td></tr>}
                    {!loadingRequests && requests.map((item) => (
                      <tr key={item.id}>
                        <td>{new Date(item.created_at).toLocaleDateString()}</td>
                        <td>{item.interested_product}</td>
                        <td>{item.request_type || 'consultation'}</td>
                        <td><span className="badge badge-soft">{item.status}</span></td>
                        <td>{item.message}</td>
                      </tr>
                    ))}
                    {!loadingRequests && !requests.length && <tr><td colSpan="5">No requests yet. Create your first consultation request.</td></tr>}
                  </tbody>
                </table>
              </div>
              <button className="btn btn-gradient" onClick={() => setActiveTab('request')}>New Request</button>
            </div>
          )}
        </main>
      </section>
    </>
  );
}

function SectionHeader({ title, text }) {
  return (
    <div className="mb-4">
      <h3>{title}</h3>
      <p className="mb-0">{text}</p>
    </div>
  );
}

function Field({ label, className, children }) {
  return (
    <div className={className}>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

function labelize(value) {
  return value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default PatientDashboard;
