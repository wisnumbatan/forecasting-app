import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import forecastReducer from './slices/forecastSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    forecast: forecastReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;