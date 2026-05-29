import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../api/axios';
import AdminLayout from '../components/AdminLayout';

function AdminInquiries() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [product, setProduct] = useState('');

  const load = async () => {
    const { data } = await api.get('/inquiries');
    setItems(data.data || []);
  };

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const filtered = useMemo(() => items
    .filter((item) => !country || item.country === country)
    .filter((item) => !product || item.interested_product === product)
    .filter((item) => [item.full_name, item.email, item.phone, item.company_name, item.message].join(' ').toLowerCase().includes(search.toLowerCase())), [items, search, country, product]);

  const countries = [...new Set(items.map((item) => item.country).filter(Boolean))];
  const products = [...new Set(items.map((item) => item.interested_product).filter(Boolean))];

  const setStatus = async (id, status) => {
    await api.put(`/inquiries/${id}/status`, { status });
    await load();
  };

  const remove = async (id) => {
    const result = await Swal.fire({ title: 'Delete inquiry?', icon: 'warning', showCancelButton: true });
    if (!result.isConfirmed) return;
    await api.delete(`/inquiries/${id}`);
    await load();
  };

  return (
    <AdminLayout title="Inquiry Management" subtitle="Search, filter, read, unread, and remove product inquiries.">
      <div className="admin-card mb-4">
        <div className="filter-bar">
          <input className="form-control" placeholder="Search name, email, phone..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}><option value="">All Countries</option>{countries.map((item) => <option key={item}>{item}</option>)}</select>
          <select className="form-select" value={product} onChange={(e) => setProduct(e.target.value)}><option value="">All Products / Services</option>{products.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
      </div>
      <div className="admin-card">
        <div className="table-responsive">
          <table className="table admin-table align-middle">
            <thead><tr><th>Name</th><th>Contact</th><th>Country</th><th>Interest</th><th>Request</th><th>Message</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>{item.full_name}<br /><small>{item.company_name}</small></td>
                  <td>{item.email}<br /><small>{item.phone}</small></td>
                  <td>{item.country}</td>
                  <td>{item.interested_product}</td>
                  <td>{item.request_type || 'inquiry'}<br /><small>{item.preferred_contact || 'Any contact'}{item.appointment_date ? ` • ${item.appointment_date}` : ''}</small></td>
                  <td>{item.message}</td>
                  <td><span className="badge badge-soft">{item.status}</span></td>
                  <td className="text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setStatus(item.id, item.status === 'read' ? 'unread' : 'read')}>{item.status === 'read' ? 'Unread' : 'Read'}</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => remove(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminInquiries;
