import { api } from '@/lib/utils/api';

export class AnalyticsService {
  static async getMetrics() {
    const { data } = await api.get('/analytics/metrics');
    return data;
  }

  static async getForecastPerformance() {
    const { data } = await api.get('/analytics/forecast-performance');
    return data;
  }

  static async getProjectStats() {
    const { data } = await api.get('/analytics/project-stats');
    return data;
  }
}