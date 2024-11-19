import { api } from '@/lib/utils/api';

export class NotificationService {
  static async getAll() {
    const { data } = await api.get('/notifications');
    return data;
  }

  static async markAsRead(id: string) {
    const { data } = await api.put(`/notifications/${id}/read`);
    return data;
  }

  static async markAllAsRead() {
    const { data } = await api.put('/notifications/read-all');
    return data;
  }
}