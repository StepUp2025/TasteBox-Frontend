import { httpClient } from 'shared/api';
import { authClient } from 'shared/api/authClient';
import {
  LoginRequestType,
  LoginResponse,
  RefereshTokenResponse,
  SignupRequestType,
  UpdatePasswordRequestType,
} from '../types/auth.type';

export const signup = async (data: SignupRequestType) => {
  const response = await httpClient.post('/auth/signup', data);
  return response.data;
};

export const login = async (data: LoginRequestType): Promise<LoginResponse> => {
  const response = await httpClient.post('/auth/login', data);
  return response.data;
};

export const logout = async () => {
  const response = await authClient.post('/auth/logout');
  return response.data;
};

export const refreshToken = async (): Promise<RefereshTokenResponse> => {
  const response = await httpClient.post('/auth/refresh');
  return response.data;
};

export const updatePassword = async (data: UpdatePasswordRequestType) => {
  const response = await authClient.put('/auth/password', data);
  return response.data;
};
