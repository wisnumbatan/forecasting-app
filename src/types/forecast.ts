export interface Forecast {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  method: ForecastMethod;
  data: TimeSeriesPoint[];
  parameters: ForecastParameters;
  metrics: ForecastMetrics;
  status: ForecastStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type ForecastMethod = 'ARIMA' | 'SARIMA' | 'Prophet' | 'HoltWinters';

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
  predicted?: number;
  confidenceLower?: number;
  confidenceUpper?: number;
}

export interface ForecastParameters {
  method: ForecastMethod;
  period: number;
  seasonality?: number;
  confidenceInterval: number;
  parameters?: Record<string, any>;
}

export interface ForecastMetrics {
  mape: number;
  rmse: number;
  mae: number;
  r2: number;
}

export type ForecastStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface ForecastDetailProps {
  id: string;
}

export interface ForecastData extends Omit<Forecast, 'projectId' | 'createdBy' | 'status'> {
  data: Array<TimeSeriesPoint>;
  metrics: ForecastMetrics;
  parameters: ForecastParameters;
}