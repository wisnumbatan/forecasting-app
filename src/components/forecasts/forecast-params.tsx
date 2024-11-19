import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

interface ForecastParamsProps {
  params: {
    method: string;
    period: number;
    seasonality: number;
    confidenceInterval: number;
  };
  onUpdate: (params: any) => void;
}

export function ForecastParams({ params, onUpdate }: ForecastParamsProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: params
  });

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Method</label>
            <Select {...register('method')}>
              <option value="ARIMA">ARIMA</option>
              <option value="SARIMA">SARIMA</option>
              <option value="Prophet">Prophet</option>
            </Select>
          </div>
          <div>
            <label>Period</label>
            <Input type="number" {...register('period')} />
          </div>
          <div>
            <label>Seasonality</label>
            <Input type="number" {...register('seasonality')} />
          </div>
          <div>
            <label>Confidence Interval (%)</label>
            <Input 
              type="number" 
              {...register('confidenceInterval')}
              min="1"
              max="99" 
            />
          </div>
        </div>
        <Button type="submit">Update Parameters</Button>
      </form>
    </Card>
  );
}