import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserModel } from "../../models";

export interface AuthState {
  signed: boolean;
  user: UserModel | null;
}

export const INITIAL_STATE: AuthState = {
  signed: false,
  user: null
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action: PayloadAction<{ user: UserModel }>) => {
      state.user = action.payload.user;
      state.signed = true;
    },

    logout: (state) => {
      state.user = null;
      state.signed = false;
    }
  }
});

export const { login, logout } = AuthSlice.actions;
export const authReducer = AuthSlice.reducer;
