import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import SmartImage from '../components/SmartImage';
import { fallbackImages } from '../data/imageFallbacks';

function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get(`/blogs/${slug}`).then(({ data }) => setBlog(data.data)).catch(() => {
      setBlog({ title: 'Digital Dental Workflow Guide', category: 'Digital Dentistry', content: 'This article explains how scanners, CAD/CAM systems, milling machines, 3D printers, and materials work together in a modern dental business.', image_url: 'https://images.unsplash.com/photo-1581093458791-9d15482442f6?auto=format&fit=crop&w=1200&q=80' });
    });
  }, [slug]);

  if (!blog) return null;

  return (
    <>
      <Helmet><title>{blog.title} | Betty Digital Dental Blog</title><meta name="description" content={String(blog.content || '').slice(0, 150)} /></Helmet>
      <section className="blog-detail-hero"><div className="container"><span className="badge badge-soft">{blog.category}</span><h1>{blog.title}</h1><SmartImage src={blog.image_url} fallback={fallbackImages.blog} alt={blog.title} /></div></section>
      <section className="section"><div className="container narrow"><div className="content-panel blog-content">{blog.content}</div></div></section>
    </>
  );
}

export default BlogDetails;
