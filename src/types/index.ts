// src/types/index.ts
export * from './auth';
export * from './forecast';
export * from './project';
export * from './api';

export interface DateRange {
  start: string;
  end: string;
}

export interface FilterOptions {
  search?: string;
  status?: string[];
  dateRange?: DateRange;
  [key: string]: any;
}