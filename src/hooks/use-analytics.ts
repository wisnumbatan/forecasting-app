// src/hooks/use-analytics.ts
import { useQuery } from '@tanstack/react-query';
import { AnalyticsService } from '@/lib/service/analytics.service';

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: AnalyticsService.getMetrics,
    refetchInterval: 300000, // 5 minutes
  });
}