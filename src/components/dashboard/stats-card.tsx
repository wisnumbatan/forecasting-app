import { Card } from "@/components/ui/card";
import { Trend } from "@/components/ui/trend";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, trend, icon, className }: StatsCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {trend && <Trend value={trend} className="mt-1" />}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </Card>
  );
}