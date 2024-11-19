import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card } from '../ui/card';
import { format } from 'date-fns';

interface ForecastChartProps {
  data: Array<{
    timestamp: string;
    actual: number;
    forecast: number;
    confidenceLower?: number;
    confidenceUpper?: number;
  }>;
  title?: string;
}

export function ForecastChart({ data, title }: ForecastChartProps) {
  const formattedData = useMemo(() => 
    data.map(d => ({
      ...d,
      date: format(new Date(d.timestamp), 'MMM dd, yyyy')
    })), 
    [data]
  );

  return (
    <Card className="p-6">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#8884d8" 
            name="Actual" 
          />
          <Line 
            type="monotone" 
            dataKey="forecast" 
            stroke="#82ca9d" 
            name="Forecast"
            strokeDasharray="5 5"
          />
          {data[0]?.confidenceLower && (
            <Line
              type="monotone"
              dataKey="confidenceLower"
              stroke="#82ca9d"
              strokeOpacity={0.3}
              name="Confidence Interval"
            />
          )}
          {data[0]?.confidenceUpper && (
            <Line
              type="monotone"
              dataKey="confidenceUpper"
              stroke="#82ca9d"
              strokeOpacity={0.3}
              name="Confidence Interval"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}