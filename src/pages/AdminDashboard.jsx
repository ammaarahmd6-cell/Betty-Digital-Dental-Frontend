import { useEffect, useState } from 'react';
import { FaBlog, FaBoxOpen, FaImages, FaInbox, FaTools } from 'react-icons/fa';
import Swal from 'sweetalert2';
import api from '../api/axios';
import { supabase } from '../api/supabase';
import AdminLayout from '../components/AdminLayout';

function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, services: 0, inquiries: 0, blogs: 0, gallery: 0 });
  const [recent, setRecent] = useState([]);

  const load = async () => {
    const [products, services, inquiries, blogs, gallery] = await Promise.all([
      api.get('/products'),
      api.get('/services'),
      api.get('/inquiries'),
      api.get('/blogs'),
      api.get('/gallery')
    ]);
    setStats({
      products: products.data.data?.length || 0,
      services: services.data.data?.length || 0,
      inquiries: inquiries.data.data?.length || 0,
      blogs: blogs.data.data?.length || 0,
      gallery: gallery.data.data?.length || 0
    });
    setRecent((inquiries.data.data || []).slice(0, 6));
  };

  useEffect(() => {
    load().catch(() => {});
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel('inquiry-notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'inquiries' }, (payload) => {
        Swal.fire('New inquiry', `${payload.new.full_name} submitted an inquiry.`, 'info');
        load().catch(() => {});
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const cards = [
    [FaBoxOpen, 'Total Products', stats.products],
    [FaTools, 'Total Services', stats.services],
    [FaInbox, 'Total Inquiries', stats.inquiries],
    [FaBlog, 'Total Blogs', stats.blogs],
    [FaImages, 'Gallery Images', stats.gallery]
  ];

  return (
    <AdminLayout title="Dashboard" subtitle="Realtime business overview and recent inquiries.">
      <div className="admin-stat-grid">
        {cards.map(([Icon, label, value]) => <div className="admin-stat-card" key={label}><Icon /><span>{label}</span><strong>{value}</strong></div>)}
      </div>
      <div className="admin-card mt-4">
        <h4>Recent Inquiries</h4>
        <div className="table-responsive"><table className="table admin-table"><thead><tr><th>Name</th><th>Product</th><th>Country</th><th>Status</th></tr></thead><tbody>{recent.map((item) => <tr key={item.id}><td>{item.full_name}</td><td>{item.interested_product}</td><td>{item.country}</td><td><span className="badge badge-soft">{item.status}</span></td></tr>)}</tbody></table></div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
