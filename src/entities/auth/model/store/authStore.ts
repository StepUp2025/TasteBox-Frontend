import { create } from "zustand";
import { AuthState } from "../types/auth.type";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  resetAccessToken: () => set({ accessToken: null }),
}));
