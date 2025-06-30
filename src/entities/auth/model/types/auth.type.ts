export type AuthProvider = "local" | "google" | "kakao";

export interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  resetAccessToken: () => void;
}

export interface SignupType {
  email: string;
  password?: string;
  nickname: string;
  contact?: string;
  image?: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface ResetPasswordType {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
