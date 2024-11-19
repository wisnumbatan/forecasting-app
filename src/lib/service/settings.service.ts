import { api } from '@/lib/utils/api';

export class SettingsService {
  static async getUserPreferences(userId: string) {
    const { data } = await api.get(`/users/${userId}/preferences`);
    return data;
  }

  static async updateUserPreferences(userId: string, preferences: any) {
    const { data } = await api.put(`/users/${userId}/preferences`, preferences);
    return data;
  }

  static async generateApiKey(userId: string) {
    const { data } = await api.post(`/users/${userId}/api-keys`);
    return data;
  }

  static async revokeApiKey(userId: string, keyId: string) {
    await api.delete(`/users/${userId}/api-keys/${keyId}`);
  }
}