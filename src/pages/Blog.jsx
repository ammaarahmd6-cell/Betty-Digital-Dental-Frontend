import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';
import BlogCard from '../components/BlogCard';

const fallbackBlogs = [
  { id: 1, title: 'How to Choose a Dental Intraoral Scanner', slug: 'choose-dental-intraoral-scanner', category: 'Buying Guide', content: 'A practical guide to accuracy, speed, support, software export, and daily clinical scanning workflow.', image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80' },
  { id: 2, title: 'CAD/CAM Workflow for Dental Labs', slug: 'cad-cam-workflow-dental-labs', category: 'Workflow', content: 'Modern dental laboratories need scan, design, nesting, milling, printing, finishing, and quality control processes.', image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80' },
  { id: 3, title: '5-Axis Dental Milling Machine Buying Guide', slug: 'dental-milling-machine-buying-guide', category: 'Dental CAD/CAM', content: 'Understand spindle power, axis control, material compatibility, calibration, dust control, and after-sales support before buying a dental mill.', image_url: 'https://images.unsplash.com/photo-1581092334247-27e8a9b9a9f7?auto=format&fit=crop&w=900&q=80' },
  { id: 4, title: 'Dental 3D Printing Applications for Labs', slug: 'dental-3d-printing-applications', category: '3D Printing', content: 'Dental 3D printers can support models, surgical guides, splints, custom trays, try-ins, casting patterns, and production planning.', image_url: 'https://images.unsplash.com/photo-1633113089631-6456cccaadad?auto=format&fit=crop&w=900&q=80' },
  { id: 5, title: 'How to Select Zirconia Discs and Blocks', slug: 'select-zirconia-discs-blocks', category: 'Materials', content: 'Choose zirconia by translucency, strength, shade system, restoration type, sintering requirements, and milling machine compatibility.', image_url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80' },
  { id: 6, title: 'Why After-Sales Support Matters in Digital Dentistry', slug: 'after-sales-support-digital-dentistry', category: 'After-Sales Support', content: 'Reliable support helps dental labs reduce downtime, solve workflow issues, train staff faster, and protect equipment investment.', image_url: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=900&q=80' }
];

function Blog() {
  const [blogs, setBlogs] = useState(fallbackBlogs);
  useEffect(() => {
    api.get('/blogs').then(({ data }) => {
      if (data.data?.length) {
        const existing = new Set(data.data.map((blog) => blog.slug));
        setBlogs([...data.data, ...fallbackBlogs.filter((blog) => !existing.has(blog.slug))]);
      }
    }).catch(() => {});
  }, []);

  return (
    <>
      <Helmet><title>Digital Dental Blog | CAD/CAM and Equipment Guides</title><meta name="description" content="Read practical articles about digital dental equipment, CAD/CAM systems, scanners, 3D printers, milling machines, materials, and lab workflows." /></Helmet>
      <section className="page-hero"><div className="container"><span className="eyebrow">Blog</span><h1>Digital Dental Knowledge Center</h1><p>Product education, workflow guidance, and buying advice for clinics and dental labs.</p></div></section>
      <section className="section"><div className="container"><div className="row g-4">{blogs.map((blog) => <div className="col-md-6 col-xl-4" key={blog.id}><BlogCard blog={blog} /></div>)}</div></div></section>
    </>
  );
}

export default Blog;
