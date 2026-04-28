import api from './api';

const projectService = {
  getAll: (ownerId) => api.get(`/projects?owner_id=${ownerId}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export default projectService;
