import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import SmartImage from '../components/SmartImage';
import { fallbackImages } from '../data/imageFallbacks';
import { contact, fallbackProducts, mergeProducts } from '../data/siteData';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(fallbackProducts.find((item) => item.id === id) || fallbackProducts[0]);
  const [related, setRelated] = useState(fallbackProducts.slice(0, 3));
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => {
      if (data.data) setProduct(data.data);
    }).catch(() => {});
    api.get('/products').then(({ data }) => {
      if (data.data?.length) setRelated(mergeProducts(data.data).filter((item) => item.id !== id).slice(0, 3));
    }).catch(() => {});
  }, [id]);

  const specs = useMemo(() => product.specifications || {}, [product]);
  const features = product.key_features ? String(product.key_features).split(',') : [];

  const submitInquiry = async (payload) => {
    await api.post('/inquiries', { ...payload, interested_product: product.product_name });
    Swal.fire('Inquiry sent', 'Our dental technology team will contact you shortly.', 'success');
    reset();
  };

  return (
    <>
      <Helmet>
        <title>{product.product_name} | Betty Digital Dental Solutions</title>
        <meta name="description" content={product.short_description} />
      </Helmet>
      <section className="section product-detail-section">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="detail-image">
                <SmartImage src={product.image_url} fallback={fallbackImages.product} alt={product.product_name} />
              </div>
            </div>
            <div className="col-lg-6">
              <span className="badge badge-soft">{product.category}</span>
              <h1>{product.product_name}</h1>
              <p className="lead-sm">{product.short_description}</p>
              <p>{product.full_description}</p>
              <div className="row g-2 mb-4">
                <div className="col-sm-6"><strong>Brand:</strong> {product.brand || 'Available on request'}</div>
                <div className="col-sm-6"><strong>Model:</strong> {product.model || 'Available on request'}</div>
              </div>
              <h5>Key Features</h5>
              <ul className="check-list">{features.map((item) => <li key={item}>{item.trim()}</li>)}</ul>
              <a className="btn btn-gradient me-2" href={`https://wa.me/${contact.whatsapp}?text=I am interested in ${encodeURIComponent(product.product_name)}`} target="_blank" rel="noreferrer">WhatsApp Inquiry</a>
              <Link to="/contact" className="btn btn-outline-primary">Contact Sales</Link>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-lg-7">
              <div className="content-panel">
                <h4>Specifications</h4>
                <div className="table-responsive">
                  <table className="table specification-table">
                    <tbody>{Object.entries(specs).map(([key, value]) => <tr key={key}><th>{key}</th><td>{String(value)}</td></tr>)}</tbody>
                  </table>
                </div>
                <h4>Applications and Benefits</h4>
                <p>Suitable for digital dental labs and clinics seeking accurate production, faster turnaround, consistent restoration quality, and a scalable CAD/CAM workflow.</p>
              </div>
            </div>
            <div className="col-lg-5">
              <form className="content-panel inquiry-form" onSubmit={handleSubmit(submitInquiry)}>
                <h4>Send Product Inquiry</h4>
                <input className="form-control" placeholder="Full Name" {...register('full_name', { required: true })} />
                {errors.full_name && <small className="text-danger">Name is required.</small>}
                <input className="form-control" placeholder="Email" type="email" {...register('email')} />
                <input className="form-control" placeholder="Phone / WhatsApp" {...register('phone')} />
                <input className="form-control" placeholder="Country" {...register('country')} />
                <textarea className="form-control" rows="4" placeholder="Message" {...register('message')} />
                <button className="btn btn-gradient w-100">Submit Inquiry</button>
              </form>
            </div>
          </div>

          <div className="mt-5">
            <h3>Related Products</h3>
            <div className="row g-4 mt-1">
              {related.map((item) => <div className="col-md-6 col-xl-4" key={item.id}><ProductCard product={item} /></div>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
