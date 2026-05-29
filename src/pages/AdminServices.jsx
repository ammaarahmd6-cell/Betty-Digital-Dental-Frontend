import AdminCrud from '../components/AdminCrud';
import AdminLayout from '../components/AdminLayout';
import SmartImage from '../components/SmartImage';
import { fallbackImages } from '../data/imageFallbacks';

function AdminServices() {
  return (
    <AdminLayout title="Services Management" subtitle="Manage service cards and consultation offers.">
      <AdminCrud
        title="Service"
        endpoint="/services"
        emptyPayload={{ service_title: '', service_description: '', icon: '', status: 'active', image: null }}
        fields={[
          { name: 'service_title', label: 'Service Title', required: true },
          { name: 'service_description', label: 'Service Description', type: 'textarea' },
          { name: 'icon', label: 'Icon Name' },
          { name: 'image', label: 'Service Image', type: 'file' },
          { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'] }
        ]}
        columns={[
          { key: 'image_url', label: 'Image', render: (item) => <SmartImage className="admin-thumb" src={item.image_url} fallback={fallbackImages.lab} alt={item.service_title} /> },
          { key: 'service_title', label: 'Service' },
          { key: 'icon', label: 'Icon' },
          { key: 'status', label: 'Status' }
        ]}
      />
    </AdminLayout>
  );
}

export default AdminServices;
