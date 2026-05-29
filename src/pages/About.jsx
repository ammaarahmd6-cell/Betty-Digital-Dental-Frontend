import { Helmet } from 'react-helmet-async';
import { FaGlobe, FaHandshake, FaMicroscope, FaTruck } from 'react-icons/fa';
import SmartImage from '../components/SmartImage';
import { fallbackImages } from '../data/imageFallbacks';
import { ownerProfile } from '../data/siteData';

function About() {
  const cards = [
    [FaMicroscope, 'Dental Technology Focus', 'We specialize in digital scanners, CAD/CAM equipment, 3D printing, milling, and lab production systems.'],
    [FaHandshake, 'Consultative Business Support', 'We help buyers choose equipment that matches their clinical needs, production volume, and investment plan.'],
    [FaTruck, 'International Supply', 'Our workflow supports product sourcing, quotation, shipment coordination, and after-sales communication.'],
    [FaGlobe, 'Global Mindset', 'The brand is built for clinics, laboratories, distributors, and dental entrepreneurs across regions.']
  ];

  return (
    <>
      <Helmet>
        <title>About Betty Digital Dental Solutions</title>
        <meta name="description" content="Learn about Betty Digital Dental Solutions, a one-stop dental technology partner for CAD/CAM, scanners, milling, printing, and lab support." />
      </Helmet>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About Us</span>
          <h1>Professional One-Stop Digital Dental Solutions</h1>
          <p>Betty Digital Dental Solutions is led by Betty Wong in Changsha, China, helping dental labs with digital dental solutions and full after-sales support.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="founder-photo-card">
                <SmartImage className="w-100" src={ownerProfile.image} fallback={fallbackImages.clinic} alt="Betty Wong digital dental solutions consultant" />
                <div>
                  <h4>{ownerProfile.name}</h4>
                  <p>{ownerProfile.role}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <span className="badge badge-soft mb-3">{ownerProfile.currentCity}, {ownerProfile.location}</span>
              <h2>{ownerProfile.name} Helps Labs Build Practical Digital Workflows</h2>
              <p className="lead-sm">{ownerProfile.bio}.</p>
              <p>From intraoral scanners and CAD software to milling machines, 3D printers, zirconia materials, and technical training, Betty Digital Dental Solutions provides end-to-end guidance for modern dental teams.</p>
              <div className="profile-facts">
                <span>Location: {ownerProfile.location}</span>
                <span>Current town/city: {ownerProfile.currentCity}</span>
                <span>Home town: {ownerProfile.homeTown}</span>
              </div>
            </div>
          </div>
          <div className="row g-4 mt-4">
            {cards.map(([Icon, title, text]) => (
              <div className="col-md-6 col-xl-3" key={title}>
                <div className="service-card h-100" data-aos="fade-up"><div className="service-icon"><Icon /></div><h5>{title}</h5><p>{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
