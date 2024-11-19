import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Card } from '../ui/card';
import { useMutation } from '@tanstack/react-query';
import { createForecast } from '../../lib/service/forecast.service';

const forecastSchema = z.object({
  name: z.string().min(3),
  method: z.enum(['ARIMA', 'SARIMA', 'Prophet', 'HoltWinters']),
  confidence: z.number().min(1).max(99),
  seasonality: z.enum(['none', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
  data: z.array(z.object({
    timestamp: z.string(),
    value: z.number()
  }))
});

export function ForecastForm() {
  const [file, setFile] = useState<File>();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof forecastSchema>>({
    resolver: zodResolver(forecastSchema)
  });

  const mutation = useMutation({
    mutationFn: createForecast,
    onSuccess: () => {
      // Handle success
    }
  });

  const onSubmit = (data: z.infer<typeof forecastSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label>Forecast Name</label>
          <Input {...register('name')} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label>Method</label>
          <Select {...register('method')}>
            <option value="ARIMA">ARIMA</option>
            <option value="SARIMA">SARIMA</option>
            <option value="Prophet">Prophet</option>
            <option value="HoltWinters">Holt-Winters</option>
          </Select>
        </div>

        <div className="space-y-2">
          <label>Data File</label>
          <Input 
            type="file" 
            accept=".csv,.xlsx"
            onChange={e => setFile(e.target.files?.[0])}
          />
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create Forecast'}
        </Button>
      </form>
    </Card>
  );
}