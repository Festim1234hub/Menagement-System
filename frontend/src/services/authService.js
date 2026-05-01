import api from './api';

const authService = {
  register: async (name, email, password) => {
    return api.post('/api/auth/register', { name, email, password });
  },

  login: async (email, password) => {
    return api.post('/api/auth/login', { email, password });
  },

  getProfile: async () => {
    return api.get('/api/auth/profile');
  },

  updateProfile: (name, email) => api.put('/api/auth/profile', { name, email }),

  changePassword: (currentPassword, newPassword) =>
    api.put('/api/auth/password', { currentPassword, newPassword }),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;
