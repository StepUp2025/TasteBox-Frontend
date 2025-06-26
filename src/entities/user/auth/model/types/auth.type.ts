export type AuthProvider = "local" | "google" | "kakao";

export interface localSignup {
    email: string;
    password?: string;
    nickname: string;
    contact?: string;
    image?: string; //이미지는 빠질 수 있음
    provider: 'local'; 
}

export interface localLogin {
    email: string;
    password: string;
    provider: 'local';
}

// google , kakao 타입은 추후 작성





