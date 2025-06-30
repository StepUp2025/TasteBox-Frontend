import { AuthProvider } from "entities/auth/model/types/auth.type";

export interface User {
  email: string;
  nickname: string;
  image?: string; // 프로필 이미지 URL
  provider: AuthProvider; // 인증 제공자
}

export interface localUser extends User {
  contact: string; // 연락처 정보
  provider: "local";
}

export interface OAuthUser extends User {
  provider: "google" | "kakao"; // OAuth 제공자
}

export interface ProfileUpdateType {
  nickname?: string; // 변경할 닉네임
  contact?: string; // 변경할 연락처 정보
  image?: string; // 변경할 프로필 이미지 URL
}
