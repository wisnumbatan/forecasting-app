import { format } from 'date-fns';

export const formatChartData = (data: any[]) => {
  return data.map(item => ({
    ...item,
    date: format(new Date(item.timestamp), 'MMM dd'),
    value: Number(item.value.toFixed(2))
  }));
};

export const getChartDomain = (data: any[], key: string) => {
  const values = data.map(item => item[key]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = (max - min) * 0.1;
  
  return [min - padding, max + padding];
};