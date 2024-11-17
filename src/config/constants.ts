// src/config/constants.ts
export const APP_CONFIG = {
  name: 'ForecastPro',
  version: '1.0.0',
  api: {
    baseUrl: '/api',
    timeout: 10000,
    retryAttempts: 3
  },
  auth: {
    sessionDuration: 24 * 60 * 60, // 24 hours
    tokenExpiry: '7d'
  },
  forecasting: {
    maxPeriods: 52,
    confidenceIntervals: [80, 90, 95],
    defaultMethod: 'ARIMA'
  }
}