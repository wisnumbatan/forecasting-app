// src/config/site.ts
export const siteConfig = {
  title: 'ForecastPro',
  description: 'Advanced Time Series Forecasting Platform',
  keywords: ['forecasting', 'time series', 'analytics', 'ML'],
  authors: [{
    name: 'ForecastPro Team',
    url: 'https://forecastpro.com'
  }],
  creator: 'ForecastPro Inc.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}