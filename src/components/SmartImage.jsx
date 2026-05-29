import { fallbackImages } from '../data/imageFallbacks';

function SmartImage({ src, alt, fallback = fallbackImages.clinic, className = '', ...props }) {
  const handleError = (event) => {
    if (event.currentTarget.src !== fallback) {
      event.currentTarget.src = fallback;
    }
  };

  return <img src={src || fallback} alt={alt || 'Betty Digital Dental Solutions'} className={className} onError={handleError} loading="lazy" {...props} />;
}

export default SmartImage;
