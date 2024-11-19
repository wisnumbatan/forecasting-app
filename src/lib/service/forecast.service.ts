import { api } from '@/lib/utils/api';
import { Forecast, ForecastParameters } from '@/types/forecast';

class ForecastService {
  static async createForecast(data: Partial<Forecast>): Promise<Forecast> {
    try {
      const response = await api.post<Forecast>('/api/forecasts', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create forecast');
    }
  }

  static async updateForecast(id: string, data: Partial<Forecast>): Promise<Forecast> {
    try {
      const response = await api.put<Forecast>(`/api/forecasts/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update forecast');
    }
  }

  static async updateForecastParameters(id: string, parameters: ForecastParameters): Promise<Forecast> {
    try {
      const response = await api.patch<Forecast>(`/api/forecasts/${id}/parameters`, parameters);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update forecast parameters');
    }
  }

  static async deleteForecast(id: string): Promise<void> {
    try {
      await api.delete(`/api/forecasts/${id}`);
    } catch (error) {
      throw new Error('Failed to delete forecast');
    }
  }

  static async getForecast(id: string): Promise<Forecast> {
    try {
      const response = await api.get<Forecast>(`/api/forecasts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch forecast');
    }
  }

  static async getAllForecasts(): Promise<Forecast[]> {
    try {
      const response = await api.get<Forecast[]>('/api/forecasts');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch forecasts');
    }
  }
}

export { ForecastService };
export const { createForecast } = ForecastService;
