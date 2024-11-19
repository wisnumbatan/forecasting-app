// src/components/dashboard/analytics-chart.tsx
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAnalytics } from "@/hooks/use-analytics";

export function AnalyticsChart() {
  const { data, isLoading } = useAnalytics();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Forecast Performance</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data as any[]}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
          <Line type="monotone" dataKey="error" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}