export interface Project {
  id: string;
  name: string;
  description?: string;
  owner: string;
  members: ProjectMember[];
  settings: ProjectSettings;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMember {
  user: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: string;
}

export interface ProjectSettings {
  forecastingMethod: ForecastMethod;
  confidenceInterval: number;
  seasonality?: 'none' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

export type ForecastMethod = 'method1' | 'method2' | 'method3';

export type ProjectStatus = 'active' | 'archived' | 'deleted';