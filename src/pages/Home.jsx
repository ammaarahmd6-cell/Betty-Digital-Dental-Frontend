import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaQuoteRight, FaStar } from 'react-icons/fa';
import api from '../api/axios';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import SmartImage from '../components/SmartImage';
import { fallbackImages } from '../data/imageFallbacks';
import { fallbackProducts, mergeProducts, ownerProfile, productCategories, services, workflowSteps, contact } from '../data/siteData';

function Home() {
  const [products, setProducts] = useState(fallbackProducts.filter((product) => product.featured));
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api.get('/products?featured=true').then(({ data }) => {
      if (data.data?.length) setProducts(mergeProducts(data.data).filter((product) => product.featured));
    }).catch(() => {});

    api.get('/testimonials?status=active').then(({ data }) => {
      setTestimonials((data.data || []).slice(0, 6));
    }).catch(() => {});
  }, []);

  const stats = [
    ['01+', 'Years Industry Experience'],
    ['50+', 'Dental Labs Supported'],
    ['10+', 'Digital Dental Products'],
    ['24/7', 'Consultation Support']
  ];

  const why = [
    'One-stop dental technology solution',
    'Modern CAD/CAM workflow',
    'High-quality equipment',
    'Professional consultation',
    'Global supply support',
    'Fast response',
    'Reliable after-sales service',
    'Cost-effective lab solutions'
  ];

  return (
    <>
      <Helmet>
        <title>Digital Dental Solutions | CAD/CAM, Dental Scanners & Lab Equipment</title>
        <meta name="description" content="Professional one-stop digital dental solutions for clinics and labs. Explore dental scanners, CAD/CAM systems, milling machines, 3D printers, zirconia materials, and expert consultation." />
        <meta name="keywords" content="digital dental solutions, dental scanners, CAD CAM dental, dental milling machine, dental 3D printer, zirconia blocks" />
        <meta property="og:title" content="Betty Digital Dental Solutions" />
        <meta property="og:description" content="Premium dental technology, equipment, workflow setup, and consultation for clinics and laboratories worldwide." />
      </Helmet>

      <Hero />

      <section className="section stats-band">
        <div className="container">
          <div className="row g-3">
            {stats.map(([number, label]) => (
              <div className="col-6 col-lg-3" key={label}>
                <div className="stat-card" data-aos="fade-up">
                  <strong>{number}</strong>
                  <span>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span>Product Categories</span>
            <h2>Complete Digital Dental Equipment Portfolio</h2>
            <p>Choose equipment, materials, and production tools for modern clinics and dental laboratories.</p>
          </div>
          <div className="row g-4">
            {productCategories.map((item) => {
              const Icon = item.icon;
              return (
                <div className="col-md-6 col-xl-3" key={item.title}>
                  <div className="category-card" data-aos="fade-up">
                    <SmartImage src={item.image} fallback={fallbackImages.product} alt={item.title} />
                    <div className="category-icon"><Icon /></div>
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                    <Link to={`/products?category=${encodeURIComponent(item.title)}`} className="btn btn-outline-primary btn-sm">View Products</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section light-bg">
        <div className="container">
          <div className="section-heading">
            <span>Featured Products</span>
            <h2>Dental Technology Ready for Real Lab Work</h2>
          </div>
          <div className="row g-4">
            {products.map((product) => <div className="col-md-6 col-xl-3" key={product.id}><ProductCard product={product} /></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span>Services</span>
            <h2>Consultation, Integration, Training, and Support</h2>
          </div>
          <div className="row g-4">
            {services.map((service) => <div className="col-md-6 col-xl-3" key={service.title}><ServiceCard service={service} /></div>)}
          </div>
        </div>
      </section>

      <section className="section light-bg">
        <div className="container">
          <div className="section-heading">
            <span>Digital Workflow</span>
            <h2>From Patient Scan to Final Restoration</h2>
          </div>
          <div className="workflow-line">
            {workflowSteps.map((step, index) => (
              <div className="workflow-step" key={step} data-aos="fade-up">
                <span>{index + 1}</span>
                <h6>{step}</h6>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <div className="section-heading text-start mb-0">
                <span>Why Choose Us</span>
                <h2>Built for Clinics, Labs, and International Buyers</h2>
                <p>We help teams select practical equipment, reduce workflow friction, and build scalable dental production systems.</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                {why.map((item) => (
                  <div className="col-sm-6" key={item}>
                    <div className="why-item"><FaCheckCircle /> {item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section light-bg">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="founder-photo-card">
                <SmartImage src={ownerProfile.image} fallback={fallbackImages.clinic} alt="Betty Wong digital dental solutions consultant" />
                <div>
                  <h4>{ownerProfile.name}</h4>
                  <p>{ownerProfile.currentCity}, {ownerProfile.location}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div className="section-heading text-start mb-0">
                <span>Meet The Consultant</span>
                <h2>{ownerProfile.name}</h2>
                <p className="lead-sm">{ownerProfile.bio}.</p>
                <p>Based in {ownerProfile.currentCity}, China, Betty supports dental labs with equipment selection, CAD/CAM workflow guidance, digital dental materials, and reliable after-sales communication.</p>
                <a href={`https://wa.me/${contact.whatsapp}`} className="btn btn-gradient" target="_blank" rel="noreferrer">WhatsApp {ownerProfile.whatsappDisplay}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span>Patient Reviews</span>
            <h2>What Patients and Dental Teams Say</h2>
            <p>Approved reviews from people who connected with Betty Digital Dental Solutions for consultation, equipment guidance, and workflow support.</p>
          </div>
          {testimonials.length > 0 ? (
            <div className="row g-4">
              {testimonials.map((item) => (
                <div className="col-md-6 col-xl-4" key={item.id}>
                  <article className="testimonial-card">
                    <FaQuoteRight className="testimonial-quote" />
                    <StarRating rating={item.rating} />
                    <p>{item.review}</p>
                    <div>
                      <strong>{item.client_name}</strong>
                      <span>{item.country || 'Patient'}</span>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          ) : (
            <div className="testimonial-empty">
              <FaQuoteRight />
              <h3>Patient reviews are coming soon</h3>
              <p>Approved patient testimonials will appear here after admin review.</p>
              <Link to="/patient/signup" className="btn btn-light-blue">Create Patient Account</Link>
            </div>
          )}
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Upgrade Your Dental Lab with Digital Dentistry?</h2>
            <p>Contact us today and get professional guidance for choosing the right dental scanner, CAD/CAM system, milling machine, 3D printer, and dental materials.</p>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <Link to="/contact" className="btn btn-light btn-lg">Contact Now</Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg">Send Inquiry</Link>
              <a href={`https://wa.me/${contact.whatsapp}`} className="btn btn-dark btn-lg" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StarRating({ rating = 5 }) {
  const value = Math.max(1, Math.min(5, Number(rating) || 5));
  return (
    <div className="testimonial-stars" aria-label={`${value} star rating`}>
      {Array.from({ length: 5 }).map((_, index) => <FaStar key={index} className={index < value ? 'active' : ''} />)}
    </div>
  );
}

export default Home;
