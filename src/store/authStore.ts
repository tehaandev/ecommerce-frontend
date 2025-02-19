import authReducer from "../slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const authStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof authStore.getState>;
export type AppDispatch = typeof authStore.dispatch;
