import { Link } from 'react-router-dom';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaTooth } from 'react-icons/fa';
import { contact, ownerProfile, productCategories, socialLinks } from '../data/siteData';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="brand-mark"><FaTooth /></span>
              <div>
                <h5 className="mb-0 text-white">Betty Digital Dental Solutions</h5>
                <small>Provide One-Stop Digital Dental Solutions</small>
              </div>
            </div>
            <p>{ownerProfile.bio}. Premium digital dental equipment, CAD/CAM systems, materials, workflow setup, and professional consultation for dental laboratories worldwide.</p>
            <div className="d-flex gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return <a key={item.label} className="social" href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}><Icon /></a>;
              })}
            </div>
          </div>
          <div className="col-6 col-lg-2">
            <h6>Company</h6>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/workflow">Workflow</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/patient/login">Patient Sign In</Link>
            <Link to="/admin/login">Admin Login</Link>
          </div>
          <div className="col-6 col-lg-3">
            <h6>Products</h6>
            {productCategories.slice(0, 6).map((item) => <Link key={item.title} to={`/products?category=${encodeURIComponent(item.title)}`}>{item.title}</Link>)}
          </div>
          <div className="col-lg-3">
            <h6>Contact</h6>
            <p className="footer-contact"><FaPhoneAlt /> {contact.phone}</p>
            <p className="footer-contact"><FaEnvelope /> {contact.email}</p>
            <p className="footer-contact"><FaMapMarkerAlt /> {ownerProfile.currentCity}, {ownerProfile.location}</p>
            <Link to="/contact" className="btn btn-outline-light btn-sm">Send Inquiry</Link>
          </div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} Betty Digital Dental Solutions. All rights reserved by DevByAmmar.</div>
      </div>
    </footer>
  );
}

export default Footer;
