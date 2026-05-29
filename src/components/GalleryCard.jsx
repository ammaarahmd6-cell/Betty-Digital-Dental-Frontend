import SmartImage from './SmartImage';
import { fallbackImages } from '../data/imageFallbacks';

function GalleryCard({ item }) {
  return (
    <div className="gallery-card" data-aos="zoom-in">
      <SmartImage src={item.image_url} fallback={fallbackImages.lab} alt={item.title} />
      <div>
        <span>{item.category || 'Digital Dentistry'}</span>
        <h5>{item.title}</h5>
      </div>
    </div>
  );
}

export default GalleryCard;
