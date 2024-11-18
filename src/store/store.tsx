// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectedWardReducer from "../slices/selectionSlice";
import patientsReducer from '../slices/patientsSlice';
const store = configureStore({
  reducer: {
    selectedWard: selectedWardReducer,
    patients: patientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
