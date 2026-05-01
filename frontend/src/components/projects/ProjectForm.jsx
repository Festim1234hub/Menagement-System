import { useState } from 'react';

function ProjectForm({ initial, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: initial?.name || '',
    description: initial?.description || '',
    status: initial?.status || 'active',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Project name is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      {error && <p className="form-error">{error}</p>}
      <label>
        Name *
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Project name"
          required
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Optional description"
          rows={3}
          className="modal-textarea"
        />
      </label>
      {initial && (
        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </label>
      )}
      <div className="modal-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (initial ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
