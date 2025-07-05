import { useRefreshToken } from 'features/auth/refreshToken/hooks/useRefreshToken';
import { useEffect } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { refresh } = useRefreshToken();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return <>{children}</>;
};
