function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <div className="service-card h-100" data-aos="fade-up">
      <div className="service-icon">{Icon ? <Icon /> : service.icon}</div>
      <h5>{service.title || service.service_title}</h5>
      <p>{service.description || service.service_description}</p>
    </div>
  );
}

export default ServiceCard;
