import { useQuery } from '@tanstack/react-query';
import { fetchPreference, UserPreference } from 'entities/user/model';

export const useUserPreference = () => {
  const { data, isLoading, isError, error } = useQuery<UserPreference>({
    queryKey: ['preference'],
    queryFn: fetchPreference,
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
