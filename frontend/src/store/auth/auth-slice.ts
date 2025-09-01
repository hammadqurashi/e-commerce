import jwtService from "@/core/services/local/jwt-service";
import type { IUser } from "@/core/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  accessToken: string;
  role: "user" | "admin";
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  accessToken: "",
  role: "user",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state: AuthState,
      action: PayloadAction<{
        token: string;
        role: "user" | "admin";
      }>
    ) {
      const { token, role } = action.payload;

      state.isLoggedIn = true;
      state.accessToken = token;
      state.role = role;

      jwtService.setAuthSession({ accessToken: token });
    },

    setUser(
      state: AuthState,
      action: PayloadAction<{
        user: IUser;
        role: "user" | "admin";
      }>
    ) {
      const { user, role } = action.payload;

      state.isLoggedIn = true;
      state.user = user;
      state.role = role;
    },
    logout(state: AuthState) {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.user = null;

      jwtService.clearSession();
    },
  },
});
