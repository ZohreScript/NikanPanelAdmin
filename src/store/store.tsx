// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectedWardReducer from "../slices/selectionSlice";
const store = configureStore({
  reducer: {
    selectedWard: selectedWardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
