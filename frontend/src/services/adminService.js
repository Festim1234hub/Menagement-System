import api from './api';

const adminService = {
  getUsers: () => api.get('/api/auth/users'),
  updateUserRole: (id, role) => api.put(`/api/auth/users/${id}/role`, { role }),
};

export default adminService;
