import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaEnvelope, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import api from '../api/axios';
import SmartImage from '../components/SmartImage';
import { fallbackImages } from '../data/imageFallbacks';
import { contact, ownerProfile } from '../data/siteData';

function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (payload) => {
    await api.post('/inquiries', payload);
    Swal.fire('Inquiry sent successfully', 'Thank you. Our team will respond soon with professional guidance.', 'success');
    reset();
  };

  return (
    <>
      <Helmet><title>Contact Betty Digital Dental Solutions</title><meta name="description" content="Send a product inquiry for dental scanners, CAD/CAM systems, milling machines, 3D printers, zirconia blocks, and dental lab equipment." /></Helmet>
      <section className="page-hero"><div className="container"><span className="eyebrow">Contact Betty Wong</span><h1>Talk to a Digital Dental Solutions Expert</h1><p>{ownerProfile.bio}. Tell us what you need, and we will help you choose the right equipment, materials, and workflow.</p></div></section>
      <section className="section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="content-panel h-100">
                <div className="contact-owner">
                  <SmartImage src={ownerProfile.image} fallback={fallbackImages.clinic} alt="Betty Wong" />
                  <div>
                    <h3>{ownerProfile.name}</h3>
                    <p>{ownerProfile.role}</p>
                  </div>
                </div>
                <p className="owner-bio">{ownerProfile.bio}.</p>
                <p className="contact-line"><FaPhoneAlt /> {contact.phone}</p>
                <p className="contact-line"><FaEnvelope /> {contact.email}</p>
                <p className="contact-line"><FaWhatsapp /> WhatsApp: {contact.phone}</p>
                <p className="contact-line"><FaMapMarkerAlt /> Location: {ownerProfile.location}</p>
                <p className="contact-line"><FaMapMarkerAlt /> Current town/city: {ownerProfile.currentCity}</p>
                <p className="contact-line"><FaMapMarkerAlt /> Home town: {ownerProfile.homeTown}</p>
                <p className="contact-line"><FaFacebookF /> Facebook: Betty Digital Dental Solutions</p>
                <a className="btn btn-gradient" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
              </div>
            </div>
            <div className="col-lg-7">
              <form className="content-panel inquiry-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-3">
                  <div className="col-md-6"><input className="form-control" placeholder="Full Name" {...register('full_name', { required: true })} />{errors.full_name && <small className="text-danger">Full name is required.</small>}</div>
                  <div className="col-md-6"><input className="form-control" type="email" placeholder="Email" {...register('email')} /></div>
                  <div className="col-md-6"><input className="form-control" placeholder="Phone / WhatsApp" {...register('phone')} /></div>
                  <div className="col-md-6"><input className="form-control" placeholder="Country" {...register('country')} /></div>
                  <div className="col-md-6"><input className="form-control" placeholder="Company / Clinic / Lab Name" {...register('company_name')} /></div>
                  <div className="col-md-6"><input className="form-control" placeholder="Interested Product / Service" {...register('interested_product')} /></div>
                  <div className="col-12"><textarea className="form-control" rows="5" placeholder="Message" {...register('message', { required: true })} />{errors.message && <small className="text-danger">Message is required.</small>}</div>
                  <div className="col-12"><button disabled={isSubmitting} className="btn btn-gradient btn-lg w-100">{isSubmitting ? 'Sending...' : 'Send Inquiry'}</button></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
