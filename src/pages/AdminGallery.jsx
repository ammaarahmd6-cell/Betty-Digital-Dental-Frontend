import AdminCrud from '../components/AdminCrud';
import AdminLayout from '../components/AdminLayout';
import SmartImage from '../components/SmartImage';
import { fallbackImages } from '../data/imageFallbacks';

const galleryCategories = ['Equipment', 'Lab Workflow', '3D Printing', 'CAD/CAM', 'Training', 'Events'];

function AdminGallery() {
  return (
    <AdminLayout title="Gallery Management" subtitle="Upload gallery images and organize them by category.">
      <AdminCrud
        title="Gallery Image"
        endpoint="/gallery"
        emptyPayload={{ title: '', category: '', image: null }}
        fields={[
          { name: 'title', label: 'Title', required: true },
          { name: 'category', label: 'Category', type: 'select', options: galleryCategories },
          { name: 'image', label: 'Gallery Image', type: 'file' }
        ]}
        columns={[
          { key: 'image_url', label: 'Image', render: (item) => <SmartImage className="admin-thumb" src={item.image_url} fallback={fallbackImages.lab} alt={item.title} /> },
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' }
        ]}
        filters={[
          { name: 'category', label: 'Category', options: galleryCategories }
        ]}
      />
    </AdminLayout>
  );
}

export default AdminGallery;
