import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

export function ActivityLog() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () => fetch('/api/activities').then(res => res.json())
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {activities?.map((activity: any) => (
          <div key={activity.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{activity.action}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            </div>
            <time className="text-sm text-muted-foreground">
              {format(new Date(activity.timestamp), 'PPp')}
            </time>
          </div>
        ))}
      </div>
    </Card>
  );
}