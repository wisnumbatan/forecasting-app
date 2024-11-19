import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Download, Filter, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';

interface ForecastTableProps {
  data: Array<{
    id: string;
    name: string;
    method: string;
    createdAt: string;
    accuracy: {
      mape: number;
      rmse: number;
    };
    status: string;
  }>;
}

export function ForecastTable({ data }: ForecastTableProps) {
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const sortedAndFilteredData = data
    .filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.method.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      return sortDirection === 'asc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

  const paginatedData = sortedAndFilteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Forecasts');
    XLSX.writeFile(wb, 'forecasts.xlsx');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Filter forecasts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={exportToExcel}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => {
                if (sortField === 'name') {
                  setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortField('name');
                  setSortDirection('asc');
                }
              }}
            >
              Name <ArrowUpDown className="w-4 h-4 inline ml-2" />
            </TableHead>
            <TableHead>Method</TableHead>
            <TableHead>MAPE</TableHead>
            <TableHead>RMSE</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((forecast) => (
            <TableRow key={forecast.id}>
              <TableCell>{forecast.name}</TableCell>
              <TableCell>{forecast.method}</TableCell>
              <TableCell>{forecast.accuracy.mape.toFixed(2)}%</TableCell>
              <TableCell>{forecast.accuracy.rmse.toFixed(2)}</TableCell>
              <TableCell>
                {format(new Date(forecast.createdAt), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  forecast.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {forecast.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center">
        <div>
          Showing {((page - 1) * itemsPerPage) + 1} to {Math.min(page * itemsPerPage, sortedAndFilteredData.length)} of {sortedAndFilteredData.length}
        </div>
        <div className="space-x-2">
          <Button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </Button>
          <Button
            disabled={page * itemsPerPage >= sortedAndFilteredData.length}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}