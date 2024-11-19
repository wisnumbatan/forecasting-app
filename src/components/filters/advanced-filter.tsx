import { useState } from 'react';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FilterOptions {
  status: string[];
  dateRange: string;
  type: string[];
}

export function AdvancedFilter({ onFilter }: { onFilter: (filters: FilterOptions) => void }) {
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    dateRange: 'all',
    type: []
  });

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <label>Status</label>
          <select
            multiple
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: Array.from(e.target.selectedOptions, option => option.value) })}
            className="select-class"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        
        <div>
          <label>Date Range</label>
          <Select
            value={filters.dateRange}
            onValueChange={(value) => setFilters({ ...filters, dateRange: value })}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </Select>
        </div>
        
        <Button onClick={() => onFilter(filters)}>Apply Filters</Button>
      </div>
    </Card>
  );
}