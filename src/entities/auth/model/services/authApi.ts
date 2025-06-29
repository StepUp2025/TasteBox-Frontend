import { httpClient } from "shared/api";


//OAuth API 요청 핸들러
export const loginGoogle = async () => {
    const response = await httpClient.get("/auth/google/login");
    return response.data;
}

export const loginKakao = async () => {
    const response = await httpClient.get("/auth/kakao/login");
    return response.data;
}

export const callbackGoogle = async () => {
    await httpClient.get("/auth/google/callback");
}

export const callbackKakao = async () => {
    await httpClient.get("/auth/kakao/callback");
}