// src/app/dashboard/forecasts/page.tsx
import { ForecastTable } from '@/components/forecasts/forecast-table';
import { Button } from '../../../components/ui/button';
import { useForecasts } from '@/hooks/use-forecast';
import { Plus } from 'lucide-react';

export default function ForecastsPage() {
  const { forecasts, isLoading } = useForecasts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Forecasts</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Forecast
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ForecastTable data={forecasts || []} />
      )}
    </div>
  );
}