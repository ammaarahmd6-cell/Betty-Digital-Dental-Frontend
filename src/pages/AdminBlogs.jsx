import AdminCrud from '../components/AdminCrud';
import AdminLayout from '../components/AdminLayout';
import SmartImage from '../components/SmartImage';
import { fallbackImages } from '../data/imageFallbacks';

const blogCategories = ['Buying Guide', 'Workflow', 'Dental CAD/CAM', 'Dental Scanners', '3D Printing', 'Materials', 'After-Sales Support'];

function AdminBlogs() {
  return (
    <AdminLayout title="Blog Management" subtitle="Publish buying guides, workflow education, and product content.">
      <AdminCrud
        title="Blog"
        endpoint="/blogs"
        emptyPayload={{ title: '', slug: '', category: '', content: '', status: 'published', image: null }}
        fields={[
          { name: 'title', label: 'Title', required: true },
          { name: 'slug', label: 'Slug' },
          { name: 'category', label: 'Category', type: 'select', options: blogCategories },
          { name: 'content', label: 'Content', type: 'textarea' },
          { name: 'image', label: 'Blog Image', type: 'file' },
          { name: 'status', label: 'Status', type: 'select', options: ['published', 'draft'] }
        ]}
        columns={[
          { key: 'image_url', label: 'Image', render: (item) => <SmartImage className="admin-thumb" src={item.image_url} fallback={fallbackImages.blog} alt={item.title} /> },
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'status', label: 'Status' }
        ]}
        filters={[
          { name: 'category', label: 'Category', options: blogCategories },
          { name: 'status', label: 'Status', options: ['published', 'draft'] }
        ]}
      />
    </AdminLayout>
  );
}

export default AdminBlogs;
