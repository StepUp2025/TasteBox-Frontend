import { refreshToken } from "entities/auth/model/services/authApi";
import { useAuthStore } from "entities/auth/model/store/authStore";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await refreshToken();
        useAuthStore.getState().setAccessToken(res.data.accessToken);
      } catch (err) {
        useAuthStore.getState().resetAccessToken();
      }
    };
    refresh();
  }, []);

  return <>{children}</>;
};
