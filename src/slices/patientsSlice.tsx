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
  name: 'patients',
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<RegisterPatientData[]>) => {
      state.patients = action.payload;
    },
    addPatient: (state, action: PayloadAction<RegisterPatientData>) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action: PayloadAction<RegisterPatientData>) => {
      const index = state.patients.findIndex(patient => patient.no_pazir === action.payload.no_pazir);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setPatients, addPatient, updatePatient, setLoading } = patientsSlice.actions;
export default patientsSlice.reducer;
