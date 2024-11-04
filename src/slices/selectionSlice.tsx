// src/redux/slices/selectedWardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedWardState {
  ward: string | null;
  year: string | null | number;
  month: string | null;
}

const initialState: SelectedWardState = {
  ward: null,
  year: null,
  month: null,
};

const selectedWardSlice = createSlice({
  name: 'selectedWard',
  initialState,
  reducers: {
    setWard(state, action: PayloadAction<string | null>) {
      state.ward = action.payload;
    },
    setYear(state, action: PayloadAction<string | null>) {
      state.year = action.payload;
    },
    setMonth(state, action: PayloadAction<string | null>) {
      state.month = action.payload;
    },
  },
});

export const { setWard, setYear, setMonth } = selectedWardSlice.actions;

export default selectedWardSlice.reducer;
