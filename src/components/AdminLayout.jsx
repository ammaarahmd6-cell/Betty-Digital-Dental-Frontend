import AdminSidebar from './AdminSidebar';

function AdminLayout({ title, subtitle, children }) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
