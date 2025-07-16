import { refreshToken } from 'entities/auth/model/services/authApi';
import { useAuthStore } from 'entities/auth/model/store/authStore';
import { createClient } from './httpClient';

export const authClient = createClient();

authClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

authClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; //retry flag 설정 -> 무한 루프 방지

      try {
        const refreshRes = await refreshToken();
        const newAccessToken = refreshRes.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return authClient(originalRequest); //  실패한 요청 재시도
      } catch (err) {
        useAuthStore.getState().resetAccessToken(); // 토큰 갱신 실패 시 토큰 초기화

        return Promise.reject(err); // refresh 실패 시 에러 반환
      }
    }

    // 만료로 인한 에러가 아닌 경우, 본래 요청 함수로 error를 전달
    return Promise.reject(error);
  },
);
