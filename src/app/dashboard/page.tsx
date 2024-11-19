import { StatsCard } from '@/components/dashboard/stats-card';
import { ForecastChart } from '../../components/forecasts/forecast-chart';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Projects"
          value="12"
          trend="+2.5%"
          icon="folder"
        />
        <StatsCard 
          title="Active Forecasts"
          value="28"
          trend="+12%"
          icon="chart"
        />
        <StatsCard 
          title="Accuracy Rate"
          value="95.2%"
          trend="+0.8%"
          icon="target"
        />
        <StatsCard 
          title="Data Points"
          value="15.2K"
          trend="+5%"
          icon="database"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ForecastChart 
          data={[]}
          title="Recent Forecasts"
        />
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          {/* Activity feed component */}
        </div>
      </div>
    </div>
  );
}