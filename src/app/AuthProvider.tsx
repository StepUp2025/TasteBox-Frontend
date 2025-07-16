import { useRefreshToken } from 'features/auth/refreshToken/hooks/useRefreshToken';
import { useEffect } from 'react';
import Loading from 'shared/ui/Loading/Loading';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { refresh, isPending } = useRefreshToken();

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (isPending) return <Loading />;

  return <>{children}</>;
};
