import {
  FaBoxOpen,
  FaChartLine,
  FaComments,
  FaCubes,
  FaFacebookF,
  FaFlask,
  FaGlobe,
  FaHeadset,
  FaMicroscope,
  FaPrint,
  FaShieldAlt,
  FaTeeth,
  FaTools,
  FaUserMd,
  FaWhatsapp
} from 'react-icons/fa';
import { MdDesignServices, MdPrecisionManufacturing } from 'react-icons/md';

export const contact = {
  phone: '+86 190 8332 4695',
  whatsapp: '8619083324695',
  email: 'info@bettydental.com',
  facebook: 'https://facebook.com/bettydigitaldental',
  address: 'Changsha, Hunan, China'
};

export const ownerProfile = {
  name: 'Betty Wong',
  role: 'Digital Dental Solutions Consultant',
  image: '/assets/betty-wong.jpg',
  location: 'China',
  currentCity: 'Changsha',
  homeTown: 'Changsha',
  bio: 'Helping labs with digital dental solutions and full after-sales support',
  whatsappDisplay: '+86 190 8332 4695'
};

export const productCategories = [
  {
    title: 'Intraoral Scanners',
    icon: FaTeeth,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
    description: 'Fast, precise digital impressions for clinics adopting modern chairside workflows.'
  },
  {
    title: 'Dental CAD/CAM Systems',
    icon: MdDesignServices,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    description: 'Integrated design, manufacturing, and case planning systems for labs and clinics.'
  },
  {
    title: 'Dental Milling Machines',
    icon: MdPrecisionManufacturing,
    image: 'https://images.unsplash.com/photo-1581092334247-27e8a9b9a9f7?auto=format&fit=crop&w=900&q=80',
    description: 'Reliable dry and wet milling solutions for zirconia, PMMA, wax, and more.'
  },
  {
    title: 'Dental 3D Printers',
    icon: FaPrint,
    image: 'https://images.unsplash.com/photo-1633113088983-cc3fe37f37b5?auto=format&fit=crop&w=900&q=80',
    description: 'High-resolution printers for models, guides, splints, patterns, and lab production.'
  },
  {
    title: 'Zirconia Blocks',
    icon: FaCubes,
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80',
    description: 'Premium dental zirconia discs and blocks with natural translucency and strength.'
  },
  {
    title: 'Dental Lab Equipment',
    icon: FaTools,
    image: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=900&q=80',
    description: 'Furnaces, scanners, compressors, sintering units, and complete lab accessories.'
  },
  {
    title: 'Dental Materials',
    icon: FaFlask,
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80',
    description: 'Resins, PMMA, wax, ceramic materials, tools, and production consumables.'
  },
  {
    title: 'Implant Planning Solutions',
    icon: FaMicroscope,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',
    description: 'Digital implant planning and surgical guide workflow support from scan to delivery.'
  }
];

const productNamesByCategory = {
  'Intraoral Scanners': ['BD Scan Pro Wireless', 'BD Scan Lite Clinic', 'BD Scan AI Color', 'BD Scan Cart System', 'BD Scan Ortho Edition'],
  'Dental CAD/CAM Systems': ['BD CAD Studio', 'BD CAM Nest Pro', 'BD Chairside CAD Kit', 'BD Lab Design Suite', 'BD Open Workflow System'],
  'Dental Milling Machines': ['BD Mill 5X Pro', 'BD Mill Dry Compact', 'BD Mill Wet Hybrid', 'BD Mill Zircon Master', 'BD Mill Chairside Mini'],
  'Dental 3D Printers': ['BD Print Max Dental', 'BD Print Guide Pro', 'BD Print Model Fast', 'BD Print Splint System', 'BD Print Lab Production'],
  'Zirconia Blocks': ['BD Zircon HT Disc', 'BD Zircon Multilayer', 'BD Zircon Esthetic Block', 'BD Zircon Implant Grade', 'BD Zircon Super Translucent'],
  'Dental Lab Equipment': ['BD Sintering Furnace', 'BD Porcelain Furnace', 'BD Model Scanner', 'BD Lab Compressor', 'BD Dust Collector'],
  'Dental Materials': ['BD Dental Resin Set', 'BD PMMA Disc Pack', 'BD Wax Milling Disc', 'BD Ceramic Stain Kit', 'BD Polishing Tool Set'],
  'Implant Planning Solutions': ['BD Implant Guide Kit', 'BD Surgical Guide Workflow', 'BD CBCT Planning Suite', 'BD Implant Scanbody Set', 'BD Guided Surgery Starter']
};

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const fallbackProducts = productCategories.flatMap((category, categoryIndex) => {
  return productNamesByCategory[category.title].map((name, index) => ({
    id: `${slugify(category.title)}-${index + 1}`,
    product_name: name,
    category: category.title,
    brand: index % 2 === 0 ? 'Betty Dental' : 'Betty Digital',
    model: `BD-${categoryIndex + 1}${index + 1}00`,
    short_description: `${name} for reliable ${category.title.toLowerCase()} workflow in clinics and dental labs.`,
    full_description: `${name} is selected for modern dental businesses that need dependable performance, clear workflow support, international supply communication, and practical after-sales guidance from Betty Wong.`,
    key_features: 'Open workflow, international delivery, training support, after-sales service',
    featured: index === 0,
    image_url: category.image,
    status: 'active',
    created_at: new Date(2026, 0, categoryIndex * 5 + index + 1).toISOString(),
    specifications: {
      usage: category.title.includes('Scanner') ? 'Clinic and lab scanning' : 'Dental lab and clinic',
      warranty: '1 Year',
      support: 'Full after-sales support',
      delivery: 'International',
      origin: 'China'
    }
  }));
});

export const mergeProducts = (apiProducts = []) => {
  const seen = new Set(apiProducts.map((product) => product.product_name));
  return [...apiProducts, ...fallbackProducts.filter((product) => !seen.has(product.product_name))];
};

export const services = [
  { title: 'Digital Dental Workflow Setup', icon: FaChartLine, description: 'Plan a complete scan-design-mill-print workflow that fits your lab capacity and budget.' },
  { title: 'Dental Equipment Consultation', icon: FaComments, description: 'Compare scanners, mills, printers, furnaces, and materials with expert business guidance.' },
  { title: 'CAD/CAM System Integration', icon: FaCubes, description: 'Connect equipment, software, and production protocols into one efficient daily workflow.' },
  { title: 'Dental Lab Training', icon: FaUserMd, description: 'Train teams on scanning, CAD design, nesting, milling, printing, finishing, and QA.' },
  { title: 'Product Supply & Support', icon: FaBoxOpen, description: 'Reliable international sourcing for equipment, parts, materials, and digital accessories.' },
  { title: 'After-Sales Technical Assistance', icon: FaHeadset, description: 'Responsive remote support, setup guidance, and practical troubleshooting.' },
  { title: 'Custom Dental Case Solutions', icon: FaShieldAlt, description: 'Support complex implant, restoration, surgical guide, and aesthetic case workflows.' },
  { title: 'International Buyer Support', icon: FaGlobe, description: 'Clear communication, shipment coordination, and product selection for global buyers.' },
  { title: 'Dental Lab Business Planning', icon: FaChartLine, description: 'Plan equipment investment, production capacity, material needs, and daily operating workflow.' },
  { title: 'Remote Workflow Troubleshooting', icon: FaHeadset, description: 'Get structured remote help for scanning, design export, nesting, milling, printing, and finishing issues.' },
  { title: 'Material Selection Guidance', icon: FaFlask, description: 'Choose zirconia, PMMA, wax, resin, and ceramic materials based on case type and machine compatibility.' },
  { title: 'Complete Lab Package Setup', icon: FaTools, description: 'Build complete starter or upgrade packages with scanners, mills, printers, furnaces, and consumables.' }
];

export const workflowSteps = ['Patient Scan', 'Digital Impression', 'CAD Design', 'CAM Milling / 3D Printing', 'Finishing & Polishing', 'Final Dental Restoration'];

export const socialLinks = [
  { label: 'WhatsApp', href: `https://wa.me/${contact.whatsapp}`, icon: FaWhatsapp },
  { label: 'Facebook', href: contact.facebook, icon: FaFacebookF }
];
