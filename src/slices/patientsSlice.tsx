// src/redux/patientsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterPatientData } from '../types/types';

interface PatientsState {
  patients: RegisterPatientData[];
  isLoading: boolean;
}

const initialState: PatientsState = {
  patients: [],
  isLoading: false,
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload; // مقدار به‌روزرسانی می‌شود
    },
    addPatient(state, action: PayloadAction<RegisterPatientData>) {
      state.patients.push(action.payload); // بیمار جدید اضافه می‌شود
    },
    updatePatient(state, action: PayloadAction<RegisterPatientData>) {

      console.log("Data received in updatePatient action:", action.payload);
      const index = state.patients.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        console.log("Previous data:", state.patients[index]);
        console.log("Updated data:", action.payload);
        state.patients[index] = action.payload;
      }
    }

    
  },
});

export const {  addPatient, updatePatient, setLoading } = patientsSlice.actions;
export default patientsSlice.reducer;
