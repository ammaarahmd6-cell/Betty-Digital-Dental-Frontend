import AdminCrud from '../components/AdminCrud';
import AdminLayout from '../components/AdminLayout';
import SmartImage from '../components/SmartImage';
import { fallbackImages } from '../data/imageFallbacks';
import { productCategories } from '../data/siteData';

function AdminProducts() {
  return (
    <AdminLayout title="Products Management" subtitle="Add, edit, feature, upload, and manage dental products.">
      <AdminCrud
        title="Product"
        endpoint="/products"
        emptyPayload={{ product_name: '', category: '', brand: '', model: '', short_description: '', full_description: '', key_features: '', specifications: '{}', status: 'active', featured: false, image: null }}
        fields={[
          { name: 'product_name', label: 'Product Name', required: true },
          { name: 'category', label: 'Category', type: 'select', options: productCategories.map((item) => item.title) },
          { name: 'brand', label: 'Brand' },
          { name: 'model', label: 'Model' },
          { name: 'short_description', label: 'Short Description', type: 'textarea' },
          { name: 'full_description', label: 'Full Description', type: 'textarea' },
          { name: 'key_features', label: 'Key Features', type: 'textarea' },
          { name: 'specifications', label: 'Specifications JSON', type: 'textarea' },
          { name: 'image', label: 'Product Image', type: 'file' },
          { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'] },
          { name: 'featured', label: 'Featured', type: 'checkbox' }
        ]}
        columns={[
          { key: 'image_url', label: 'Image', render: (item) => <SmartImage className="admin-thumb" src={item.image_url} fallback={fallbackImages.product} alt={item.product_name} /> },
          { key: 'product_name', label: 'Product' },
          { key: 'category', label: 'Category' },
          { key: 'featured', label: 'Featured', render: (item) => item.featured ? 'Yes' : 'No' },
          { key: 'status', label: 'Status' }
        ]}
        filters={[
          { name: 'category', label: 'Category', options: productCategories.map((item) => item.title) },
          { name: 'status', label: 'Status', options: ['active', 'inactive'] }
        ]}
      />
    </AdminLayout>
  );
}

export default AdminProducts;
