import { Link } from 'react-router-dom';
import SmartImage from './SmartImage';
import { fallbackImages } from '../data/imageFallbacks';

function BlogCard({ blog }) {
  return (
    <article className="card blog-card h-100" data-aos="fade-up">
      <SmartImage src={blog.image_url} fallback={fallbackImages.blog} className="card-img-top" alt={blog.title} />
      <div className="card-body">
        <span className="badge badge-soft">{blog.category || 'Digital Dentistry'}</span>
        <h5>{blog.title}</h5>
        <p>{String(blog.content || '').replace(/<[^>]+>/g, '').slice(0, 120)}...</p>
        <Link to={`/blog/${blog.slug}`} className="btn btn-outline-primary btn-sm">Read Article</Link>
      </div>
    </article>
  );
}

export default BlogCard;
