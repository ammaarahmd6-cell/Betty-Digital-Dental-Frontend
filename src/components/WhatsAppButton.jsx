import { FaWhatsapp } from 'react-icons/fa';
import { contact } from '../data/siteData';

function WhatsAppButton() {
  return (
    <a className="whatsapp-float" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;
