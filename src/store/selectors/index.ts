import { RootState } from '../index';

export const selectSelectedProject = (state: RootState) => 
  state.project.selectedProjectId;

export const selectProjectFilters = (state: RootState) => 
  state.project.filters;

export const selectSelectedForecast = (state: RootState) =>
  state.forecast.selectedForecastId;

export const selectForecastTimeRange = (state: RootState) =>
  state.forecast.timeRange;