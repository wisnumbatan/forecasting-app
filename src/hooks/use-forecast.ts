
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ForecastService } from '../lib/service/forecast.service';
import { Toast } from '../components/ui/toast';

export function useForecasts() {
  const queryClient = useQueryClient();

  const forecasts = useQuery({
    queryKey: ['forecasts'],
    queryFn: ForecastService.getAllForecasts,
  });

  const createForecast = useMutation({
    mutationFn: ForecastService.createForecast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forecasts'] });
      Toast({ title: 'Forecast created successfully' });
    },
    onError: (error) => {
      Toast({ 
        title: 'Error creating forecast',
        variant: 'destructive'
      });
    },
  });

  const deleteForecast = useMutation({
    mutationFn: ForecastService.deleteForecast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forecasts'] });
      Toast({ title: 'Forecast deleted successfully' });
    },
  });

  return {
    forecasts: forecasts.data,
    isLoading: forecasts.isLoading,
    isError: forecasts.isError,
    error: forecasts.error,
    create: createForecast.mutate,
    delete: deleteForecast.mutate,
  };
}

export function useForecast(id: string) {
  return useQuery({
    queryKey: ['forecasts', id],
    queryFn: () => ForecastService.getForecast(id),
    enabled: !!id,
  });
}