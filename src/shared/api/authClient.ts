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
