import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuthStore } from 'entities/auth/model/store/authStore';
import { fetchPreference, UserPreference } from 'entities/user/model';
import { useEffect } from 'react';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useUserPreference = (option?: {
  onSuccess?: (data: UserPreference) => void;
  onError?: (error: AxiosError<CustomErrorResponse>) => void;
}) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { data, isLoading, isError, error } = useQuery<
    UserPreference,
    AxiosError<CustomErrorResponse>
  >({
    queryKey: ['preference'],
    queryFn: fetchPreference,
    enabled: isLoggedIn,
  });

  // 후처리 함수 실행
  useEffect(() => {
    if (data) option?.onSuccess?.(data);
  }, [data, option?.onSuccess]);

  useEffect(() => {
    if (error) option?.onError?.(error);
  }, [error, option?.onError]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
