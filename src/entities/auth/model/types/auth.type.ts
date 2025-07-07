export type AuthProvider = 'local' | 'google' | 'kakao';

export interface SignupRequestType {
  email: string;
  password?: string;
  nickname: string;
  contact?: string;
  image?: string;
}

export interface LoginRequestType {
  email: string;
  password: string;
}

export interface UpdatePasswordRequestType {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface LoginResponse {
  accessToken: string;
  isPreferenceSet: boolean;
}

export interface RefereshTokenResponse {
  accessToken: string;
}
