import { NavLink, useNavigate } from 'react-router-dom';
import { FaBlog, FaBoxOpen, FaChartPie, FaImages, FaInbox, FaQuoteRight, FaSignOutAlt, FaTools } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', label: 'Dashboard', icon: FaChartPie },
  { to: '/admin/products', label: 'Products', icon: FaBoxOpen },
  { to: '/admin/services', label: 'Services', icon: FaTools },
  { to: '/admin/gallery', label: 'Gallery', icon: FaImages },
  { to: '/admin/blogs', label: 'Blogs', icon: FaBlog },
  { to: '/admin/inquiries', label: 'Inquiries', icon: FaInbox },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FaQuoteRight }
];

function AdminSidebar() {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">Betty Digital<span>Admin Panel</span></div>
      <div className="admin-user">{admin?.name || 'Betty Wong'}<span>{admin?.email || 'ammaarahmd6@gmail.com'}</span></div>
      <nav>
        {links.map((item) => {
          const Icon = item.icon;
          return <NavLink key={item.to} to={item.to} end={item.to === '/admin'}><Icon /> {item.label}</NavLink>;
        })}
      </nav>
      <button className="btn btn-light w-100 mt-auto" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
    </aside>
  );
}

export default AdminSidebar;
