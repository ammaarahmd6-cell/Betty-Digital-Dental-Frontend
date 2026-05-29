import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { fallbackProducts, mergeProducts, productCategories } from '../data/siteData';

function Products() {
  const [params] = useSearchParams();
  const [products, setProducts] = useState(fallbackProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(params.get('category') || '');
  const [brand, setBrand] = useState('');
  const [sort, setSort] = useState('latest');

  useEffect(() => {
    api.get('/products').then(({ data }) => {
      if (data.data?.length) setProducts(mergeProducts(data.data));
    }).catch(() => {});
  }, []);

  const brands = [...new Set(products.map((item) => item.brand).filter(Boolean))];

  const filtered = useMemo(() => {
    return products
      .filter((item) => !category || item.category === category)
      .filter((item) => !brand || item.brand === brand)
      .filter((item) => [item.product_name, item.category, item.brand, item.short_description].join(' ').toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => sort === 'featured' ? Number(b.featured) - Number(a.featured) : new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }, [products, category, brand, search, sort]);

  return (
    <>
      <Helmet>
        <title>Dental Products | Scanners, CAD/CAM, Milling, 3D Printers</title>
        <meta name="description" content="Explore dental scanners, CAD/CAM systems, dental milling machines, 3D printers, zirconia blocks, dental lab equipment, and materials." />
      </Helmet>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Products</span>
          <h1>Dental Equipment and Digital Workflow Products</h1>
          <p>Search professional dental technology products for clinics, laboratories, and distributors.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <input className="form-control" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {productCategories.map((item) => <option key={item.title} value={item.title}>{item.title}</option>)}
            </select>
            <select className="form-select" value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">All Brands</option>
              {brands.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="latest">Sort by latest</option>
              <option value="featured">Sort by featured</option>
            </select>
          </div>
          <div className="row g-4 mt-2">
            {filtered.map((product) => <div className="col-md-6 col-xl-3" key={product.id}><ProductCard product={product} /></div>)}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
