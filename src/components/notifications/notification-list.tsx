
import { useQuery } from '@tanstack/react-query';
import { NotificationService } from '@/lib/service/notification.service';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export function NotificationList() {
  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: NotificationService.getAll,
    refetchInterval: 30000
  });

  const notifications = data as Notification[] || [];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {notifications.map((notification: Notification) => (
        <Card key={notification.id} className="p-4">
            <div>
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm text-muted-foreground">
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {format(new Date(notification.createdAt), 'PPp')}
              </p>
            </div>
            {!notification.read && (
              <Badge>New</Badge>
            )}
          </Card>
      ))}
    </div>
  );
}