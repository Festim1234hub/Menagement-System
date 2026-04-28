import api from './api';

const authService = {

  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { 
      name, email, password 
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { 
      email, password 
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

};

export default authService;