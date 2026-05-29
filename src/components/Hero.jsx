import { Link } from 'react-router-dom';
import { FaCube, FaPrint, FaQrcode, FaShieldAlt } from 'react-icons/fa';
import SmartImage from './SmartImage';
import { fallbackImages } from '../data/imageFallbacks';
import { ownerProfile } from '../data/siteData';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-orbit hero-orbit-a"><FaQrcode /></div>
      <div className="hero-orbit hero-orbit-b"><FaPrint /></div>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6" data-aos="fade-right">
            <span className="eyebrow">Betty Wong • China Digital Dental Partner</span>
            <h1>Provide One-Stop Digital Dental Solutions</h1>
            <p className="lead">Advanced dental technology, CAD/CAM systems, 3D dental workflow, and professional dental lab solutions for clinics and laboratories worldwide.</p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-gradient btn-lg">Explore Products</Link>
              <Link to="/contact" className="btn btn-light-blue btn-lg">Get Free Consultation</Link>
            </div>
            <div className="hero-trust">
              <span><FaShieldAlt /> Verified supply support</span>
              <span><FaCube /> Complete CAD/CAM workflow</span>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-left">
            <div className="hero-visual">
              <SmartImage src={ownerProfile.image} fallback={fallbackImages.clinic} alt="Betty Wong digital dental solutions consultant in China" />
              <div className="floating-card top-card">
                <strong>{ownerProfile.name}</strong>
                <span>{ownerProfile.role}</span>
              </div>
              <div className="floating-card bottom-card">
                <strong>Based in {ownerProfile.currentCity}</strong>
                <span>Full after-sales support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
