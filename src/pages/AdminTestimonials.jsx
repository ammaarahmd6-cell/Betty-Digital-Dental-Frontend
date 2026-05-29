import AdminCrud from '../components/AdminCrud';
import AdminLayout from '../components/AdminLayout';

function AdminTestimonials() {
  return (
    <AdminLayout title="Testimonials Management" subtitle="Manage client reviews and trust-building proof.">
      <AdminCrud
        title="Testimonial"
        endpoint="/testimonials"
        emptyPayload={{ client_name: '', country: '', review: '', rating: 5, status: 'active' }}
        fields={[
          { name: 'client_name', label: 'Client Name', required: true },
          { name: 'country', label: 'Country' },
          { name: 'review', label: 'Review', type: 'textarea' },
          { name: 'rating', label: 'Rating', type: 'number' },
          { name: 'status', label: 'Status', type: 'select', options: ['pending', 'active', 'inactive'] }
        ]}
        columns={[
          { key: 'client_name', label: 'Client' },
          { key: 'country', label: 'Country' },
          { key: 'rating', label: 'Rating' },
          { key: 'status', label: 'Status' }
        ]}
        filters={[
          { name: 'status', label: 'Status', options: ['pending', 'active', 'inactive'] }
        ]}
      />
    </AdminLayout>
  );
}

export default AdminTestimonials;
