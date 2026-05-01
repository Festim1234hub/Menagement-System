import api from './api';

const taskService = {
  getByProject: (projectId, filters = {}) => {
    const params = new URLSearchParams({ project_id: projectId, ...filters });
    return api.get(`/api/tasks?${params}`);
  },
  create: (data) => api.post('/api/tasks', data),
  update: (id, data) => api.put(`/api/tasks/${id}`, data),
  delete: (id) => api.delete(`/api/tasks/${id}`),
};

export default taskService;
