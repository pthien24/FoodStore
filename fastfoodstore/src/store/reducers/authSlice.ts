import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginInfo } from "../../services/userService";
import Register from "./../../pages/Register";

interface AuthState {
  isLoggedIn: boolean;
  token?: string;
  role?: string;
  userInfo?: LoginInfo;
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: undefined,
    role: undefined,
    userInfo: undefined,
  } as AuthState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        userInfo: LoginInfo;
        role: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
      state.role = action.payload.role;
    },
    register: (
      state,
      action: PayloadAction<{
        token: string;
        userInfo: LoginInfo;
        role: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = undefined;
      state.userInfo = undefined;
    },
  },
});
export const { login, logout, register } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
