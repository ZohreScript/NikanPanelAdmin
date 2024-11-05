// src/redux/slices/selectedWardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedWardState {
  ward: string ;
  year: number ;
  month: number ; 
}

const initialState: SelectedWardState = {
  ward: '',
    year: 0,
  month: 0,
};

const selectedWardSlice = createSlice({
  name: 'selectedWard',
  initialState,
  reducers: {
    setWard(state, action: PayloadAction<string >) {
      state.ward = action.payload;
    },
    setYear(state, action: PayloadAction< number >) {
      state.year = action.payload;
    },
    setMonth(state, action: PayloadAction<number > ) {
      state.month = action.payload;
    },
  },
});

export const { setWard, setYear, setMonth } = selectedWardSlice.actions;

export default selectedWardSlice.reducer;