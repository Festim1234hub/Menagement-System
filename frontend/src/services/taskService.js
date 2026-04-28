import api from './api';

const taskService = {
  getByProject: (projectId, filters = {}) => {
    const params = new URLSearchParams({ project_id: projectId, ...filters });
    return api.get(`/tasks?${params}`);
  },
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
};

export default taskService;
