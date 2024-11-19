import axios from 'axios';
import { AppError } from '../../components/shared/error-handler';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new AppError(
        error.response.data.message || 'An error occurred',
        error.response.data.code || 'UNKNOWN_ERROR',
        error.response.status
      );
    }
    throw error;
  }
);