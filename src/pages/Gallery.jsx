import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';
import GalleryCard from '../components/GalleryCard';

const fallbackGallery = [
  { id: 1, title: 'Digital Dental Scanner Setup', category: 'Equipment', image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80' },
  { id: 2, title: 'Modern CAD/CAM Lab', category: 'Lab Workflow', image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80' },
  { id: 3, title: 'Dental 3D Printing Workflow', category: '3D Printing', image_url: 'https://images.unsplash.com/photo-1633113088983-cc3fe37f37b5?auto=format&fit=crop&w=900&q=80' },
  { id: 4, title: 'Zirconia Milling Production', category: 'CAD/CAM', image_url: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80' },
  { id: 5, title: 'Dental Lab Training Session', category: 'Training', image_url: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=900&q=80' },
  { id: 6, title: 'Complete Digital Lab Package', category: 'Equipment', image_url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80' }
];

function Gallery() {
  const [items, setItems] = useState(fallbackGallery);

  useEffect(() => {
    api.get('/gallery').then(({ data }) => {
      if (data.data?.length) {
        const existing = new Set(data.data.map((item) => item.title));
        setItems([...data.data, ...fallbackGallery.filter((item) => !existing.has(item.title))]);
      }
    }).catch(() => {});
  }, []);

  return (
    <>
      <Helmet><title>Dental Equipment Gallery | Betty Digital Dental Solutions</title><meta name="description" content="View digital dental equipment, gallery images, lab setups, scanner workflows, CAD/CAM systems, and 3D dental production examples." /></Helmet>
      <section className="page-hero"><div className="container"><span className="eyebrow">Gallery</span><h1>Dental Technology Gallery</h1><p>Explore equipment, labs, product setups, and digital dental workflow visuals.</p></div></section>
      <section className="section"><div className="container"><div className="gallery-grid">{items.map((item) => <GalleryCard key={item.id} item={item} />)}</div></div></section>
    </>
  );
}

export default Gallery;
