import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/auth-slice";
import { taskReducer } from "./tasks/task-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
