import { Card } from '@/components/ui/card';

interface MetricsProps {
  metrics: {
    mape: number;
    rmse: number;
    mae: number;
    r2: number;
  };
}

export function ForecastMetrics({ metrics }: MetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">MAPE</p>
        <p className="text-2xl font-bold">{metrics.mape.toFixed(2)}%</p>
      </Card>
      
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">RMSE</p>
        <p className="text-2xl font-bold">{metrics.rmse.toFixed(2)}</p>
      </Card>
      
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">MAE</p>
        <p className="text-2xl font-bold">{metrics.mae.toFixed(2)}</p>
      </Card>
      
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">R²</p>
        <p className="text-2xl font-bold">{metrics.r2.toFixed(3)}</p>
      </Card>
    </div>
  );
}