import { api } from './api';
import { store } from '@/store';

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
      store.dispatch({ type: 'auth/logout' });
    }
    return Promise.reject(error);
  }
);