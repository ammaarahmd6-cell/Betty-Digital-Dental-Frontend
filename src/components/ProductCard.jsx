import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { contact } from '../data/siteData';
import SmartImage from './SmartImage';
import { fallbackImages } from '../data/imageFallbacks';

function ProductCard({ product }) {
  const features = product.key_features ? String(product.key_features).split(',').slice(0, 3) : [];

  return (
    <div className="card product-card h-100" data-aos="fade-up">
      <SmartImage src={product.image_url} fallback={fallbackImages.product} className="card-img-top" alt={product.product_name} />
      <div className="card-body d-flex flex-column">
        <span className="badge badge-soft align-self-start">{product.category}</span>
        <h5>{product.product_name}</h5>
        <p>{product.short_description}</p>
        <div className="feature-list">
          {features.map((item) => <span key={item}>{item.trim()}</span>)}
        </div>
        <div className="mt-auto d-flex gap-2 flex-wrap">
          <Link to={`/products/${product.id}`} className="btn btn-outline-primary btn-sm">View Details</Link>
          <a className="btn btn-gradient btn-sm" href={`https://wa.me/${contact.whatsapp}?text=I am interested in ${encodeURIComponent(product.product_name)}`} target="_blank" rel="noreferrer"><FaWhatsapp /> Inquiry</a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
