// src/config/api.ts
import { AxiosRequestConfig } from 'axios';
import { APP_CONFIG } from './constants';

export const apiConfig: AxiosRequestConfig = {
  baseURL: APP_CONFIG.api.baseUrl,
  timeout: APP_CONFIG.api.timeout,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Version': APP_CONFIG.version
  },
  validateStatus: (status) => status >= 200 && status < 300,
  withCredentials: true
}

export const apiEndpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh'
  },
  forecasts: {
    base: '/forecasts',
    detail: (id: string) => `/forecasts/${id}`,
    analyze: (id: string) => `/forecasts/${id}/analyze`,
    export: (id: string) => `/forecasts/${id}/export`
  },
  projects: {
    base: '/projects',
    detail: (id: string) => `/projects/${id}`,
    members: (id: string) => `/projects/${id}/members`,
    statistics: (id: string) => `/projects/${id}/statistics`
  },
  users: {
    base: '/users',
    detail: (id: string) => `/users/${id}`,
    preferences: (id: string) => `/users/${id}/preferences`,
    activities: (id: string) => `/users/${id}/activities`
  }
}