import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
  selectedProjectId: string | null;
  filters: {
    status: string[];
    search: string;
  };
}

const initialState: ProjectState = {
  selectedProjectId: null,
  filters: {
    status: [],
    search: ''
  }
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<string>) => {
      state.selectedProjectId = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<typeof state.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  }
});

export const { setSelectedProject, updateFilters } = projectSlice.actions;
export default projectSlice.reducer;