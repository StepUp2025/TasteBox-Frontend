import { httpClient } from "shared/api";
import { authClient } from "shared/api/authClient";
import { LoginType, ResetPasswordType, SignupType } from "../types/auth.type";

export const signup = async (data: SignupType) => {
  const response = await httpClient.post("auth/signup", data);
  return response.data;
};

export const login = async (data: LoginType) => {
  const response = await httpClient.post("auth/login", data);
  return response.data;
};

export const logout = async () => {
  const response = await authClient.post("auth/logout");
  return response.data;
};

export const refreshToken = async () => {
  const response = await authClient.post("auth/refresh");
  return response.data;
};

export const resetPassword = async (data: ResetPasswordType) => {
  const response = await authClient.post("auth/password", data);
  return response.data;
};

//OAuth API 요청 핸들러
export const loginGoogle = async () => {
  const response = await httpClient.post("/auth/google/login");
  return response.data;
};

export const loginKakao = async () => {
  const response = await httpClient.get("/auth/kakao/login");
  return response.data;
};

export const callbackGoogle = async () => {
  await httpClient.get("/auth/google/callback");
};

export const callbackKakao = async () => {
  await httpClient.get("/auth/kakao/callback");
};
