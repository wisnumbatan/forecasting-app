import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ForecastState {
  selectedForecastId: string | null;
  timeRange: {
    start: string;
    end: string;
  };
  method: string;
}

const initialState: ForecastState = {
  selectedForecastId: null,
  timeRange: {
    start: '',
    end: ''
  },
  method: 'ARIMA'
};

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setSelectedForecast: (state, action: PayloadAction<string>) => {
      state.selectedForecastId = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<typeof initialState.timeRange>) => {
      state.timeRange = action.payload;
    },
    setMethod: (state, action: PayloadAction<string>) => {
      state.method = action.payload;
    }
  }
});

export const { setSelectedForecast, setTimeRange, setMethod } = forecastSlice.actions;
export default forecastSlice.reducer;