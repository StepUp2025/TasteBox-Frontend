import { AuthProvider } from 'entities/auth/model/types/auth.type';

export interface User {
  email: string;
  nickname: string;
  image?: string; // 프로필 이미지 URL
  contact: string; // 연락처 정보
  provider: AuthProvider; // 인증 제공자
}

export interface LocalUser extends User {
  provider: 'local';
}

export interface OAuthUser extends User {
  provider: 'google' | 'kakao'; // OAuth 제공자
}

export interface ProfileUpdateType {
  nickname?: string; // 변경할 닉네임
  contact?: string; // 변경할 연락처 정보
  image?: File; // 변경할 프로필 이미지 URL
}

export interface ProfieResponseType {
  nickname: string;
  contact: string;
  image: string | null; // 프로필 이미지 URL
}
