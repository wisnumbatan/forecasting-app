import { useQuery } from '@tanstack/react-query';
import { ForecastService } from '@/lib/service/forecast.service';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ForecastChart } from './forecast-chart';
import { ForecastMetrics } from './forecast-metrics';
import { ForecastParams } from './forecast-params';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { Alert } from '@/components/ui/alret';
import { 
  ForecastDetailProps, 
  ForecastData,
  ForecastParameters 
} from '@/types/forecast';

export function ForecastDetail({ id }: ForecastDetailProps) {
  const { 
    data: forecast, 
    isLoading,
    isError,
    error 
  } = useQuery<ForecastData>({
    queryKey: ['forecasts', id],
    queryFn: () => ForecastService.getForecast(id),
    enabled: Boolean(id)
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <p>{error instanceof Error ? error.message : 'Failed to load forecast'}</p>
      </Alert>
    );
  }

  if (!forecast) {
    return (
      <Alert>
        <p>No forecast data found</p>
      </Alert>
    );
  }

  const handleParameterUpdate = async (params: ForecastParameters) => {
    try {
      await ForecastService.updateForecast(id, { parameters: params });
    } catch (error) {
      console.error('Failed to update parameters:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">{forecast.name}</h2>
        <p className="text-muted-foreground">{forecast.description}</p>
      </Card>

      <Tabs defaultValue="visualization">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="mt-6">
          <ForecastChart 
            data={forecast.data.filter(point => point.predicted !== undefined).map(point => ({
              timestamp: point.timestamp,
              actual: point.value,
              forecast: point.predicted as number,
              confidenceLower: point.confidenceLower,
              confidenceUpper: point.confidenceUpper
            }))} 
          />
        </TabsContent>

        <TabsContent value="metrics" className="mt-6">
          <ForecastMetrics metrics={forecast.metrics} />
        </TabsContent>

        <TabsContent value="parameters" className="mt-6">
          <ForecastParams 
            params={{
              ...forecast.parameters,
              seasonality: forecast.parameters.seasonality ?? 1
            }}
            onUpdate={handleParameterUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}