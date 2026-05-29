import { Helmet } from 'react-helmet-async';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/siteData';

function Services() {
  return (
    <>
      <Helmet><title>Dental CAD/CAM Services and Consultation</title><meta name="description" content="Digital dental workflow setup, equipment consultation, CAD/CAM integration, training, support, and international buyer services." /></Helmet>
      <section className="page-hero"><div className="container"><span className="eyebrow">Services</span><h1>Digital Dental Services for Clinics and Labs</h1><p>Plan, integrate, train, and support your digital dentistry investment with practical professional guidance.</p></div></section>
      <section className="section"><div className="container"><div className="row g-4">{services.map((service) => <div className="col-md-6 col-xl-3" key={service.title}><ServiceCard service={service} /></div>)}</div></div></section>
    </>
  );
}

export default Services;
