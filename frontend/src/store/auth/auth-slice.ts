import jwtService from "@/core/services/local/jwt-service";
import type { IUser } from "@/core/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  accessToken: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state: AuthState,
      action: PayloadAction<{
        token: string;
      }>
    ) {
      const { token } = action.payload;

      state.isLoggedIn = true;
      state.accessToken = token;

      jwtService.setAuthSession({ accessToken: token });
    },

    setUser(
      state: AuthState,
      action: PayloadAction<{
        user: IUser;
      }>
    ) {
      const { user } = action.payload;

      state.isLoggedIn = true;
      state.user = user;
    },
    logout(state: AuthState) {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.user = null;

      jwtService.clearSession();
    },
  },
});
