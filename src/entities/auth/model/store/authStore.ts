import { create } from 'zustand';

export interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  resetAccessToken: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  resetAccessToken: () => set({ accessToken: null }),
  isLoggedIn: () => !!get().accessToken,
}));
