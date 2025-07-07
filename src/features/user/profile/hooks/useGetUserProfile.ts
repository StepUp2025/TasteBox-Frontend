import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile, LocalUser, OAuthUser } from 'entities/user/model';

export const useGetUserProfile = () => {
  const { data, isLoading, isError, error } = useQuery<LocalUser | OAuthUser>({
    queryKey: ['profile'],
    queryFn: fetchUserProfile,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
