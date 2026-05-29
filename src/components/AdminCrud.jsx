import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../api/axios';

function AdminCrud({ title, endpoint, fields, columns, emptyPayload, filters = [] }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyPayload);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});

  const load = async () => {
    setLoading(true);
    const { data } = await api.get(endpoint);
    setItems(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    load().catch(() => setLoading(false));
  }, [endpoint]);

  const updateField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const submit = async (event) => {
    event.preventDefault();
    const hasFile = fields.some((field) => field.type === 'file' && form[field.name]);
    let payload = form;

    if (hasFile) {
      payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined) payload.append(key, value);
      });
    }

    if (editing) await api.put(`${endpoint}/${editing.id}`, payload);
    else await api.post(endpoint, payload);

    Swal.fire('Saved', `${title} data has been saved.`, 'success');
    setForm(emptyPayload);
    setEditing(null);
    await load();
  };

  const editItem = (item) => {
    setEditing(item);
    setForm({ ...emptyPayload, ...item, specifications: item.specifications ? JSON.stringify(item.specifications, null, 2) : emptyPayload.specifications });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteItem = async (id) => {
    const result = await Swal.fire({ title: 'Delete item?', text: 'This action cannot be undone.', icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete' });
    if (!result.isConfirmed) return;
    await api.delete(`${endpoint}/${id}`);
    await load();
  };

  const visibleItems = useMemo(() => {
    return items.filter((item) => filters.every((filter) => {
      const value = activeFilters[filter.name];
      return !value || item[filter.name] === value;
    }));
  }, [items, filters, activeFilters]);

  return (
    <div className="row g-4">
      <div className="col-xl-4">
        <form className="admin-card" onSubmit={submit}>
          <h4>{editing ? `Edit ${title}` : `Add ${title}`}</h4>
          {fields.map((field) => (
            <div className="mb-3" key={field.name}>
              <label className="form-label">{field.label}</label>
              {field.type === 'textarea' && <textarea className="form-control" rows="4" value={form[field.name] || ''} onChange={(e) => updateField(field.name, e.target.value)} />}
              {field.type === 'select' && (
                <select className="form-select" value={form[field.name] || ''} onChange={(e) => updateField(field.name, e.target.value)}>
                  <option value="">Select</option>
                  {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              )}
              {field.type === 'checkbox' && <div className="form-check form-switch"><input className="form-check-input" type="checkbox" checked={Boolean(form[field.name])} onChange={(e) => updateField(field.name, e.target.checked)} /></div>}
              {field.type === 'file' && <input className="form-control" type="file" accept="image/*,video/*" onChange={(e) => updateField(field.name, e.target.files[0])} />}
              {!['textarea', 'select', 'checkbox', 'file'].includes(field.type) && <input className="form-control" type={field.type || 'text'} value={form[field.name] || ''} onChange={(e) => updateField(field.name, e.target.value)} required={field.required} />}
            </div>
          ))}
          <button className="btn btn-gradient w-100">{editing ? 'Update' : 'Create'}</button>
          {editing && <button type="button" className="btn btn-link w-100 mt-2" onClick={() => { setEditing(null); setForm(emptyPayload); }}>Cancel editing</button>}
        </form>
      </div>
      <div className="col-xl-8">
        <div className="admin-card">
          {filters.length > 0 && (
            <div className="admin-filter-row">
              {filters.map((filter) => (
                <div key={filter.name}>
                  <label className="form-label">{filter.label}</label>
                  <select className="form-select" value={activeFilters[filter.name] || ''} onChange={(e) => setActiveFilters((prev) => ({ ...prev, [filter.name]: e.target.value }))}>
                    <option value="">All {filter.label}</option>
                    {filter.options.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
              ))}
              <button type="button" className="btn btn-light-blue align-self-end" onClick={() => setActiveFilters({})}>Clear</button>
            </div>
          )}
          <div className="table-responsive">
            <table className="table admin-table align-middle">
              <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}<th>Actions</th></tr></thead>
              <tbody>
                {loading && <tr><td colSpan={columns.length + 1}>Loading...</td></tr>}
                {!loading && visibleItems.map((item) => (
                  <tr key={item.id}>
                    {columns.map((column) => <td key={column.key}>{column.render ? column.render(item) : String(item[column.key] ?? '')}</td>)}
                    <td className="text-nowrap">
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editItem(item)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {!loading && !visibleItems.length && <tr><td colSpan={columns.length + 1}>No records found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCrud;
