import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { fetchUserProfile, LocalUser, OAuthUser } from 'entities/user/model';
import { useEffect } from 'react';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useGetUserProfile = (option?: {
  onSuccess?: (data: LocalUser | OAuthUser) => void;
  onError?: (error: AxiosError<CustomErrorResponse>) => void;
}) => {
  const { data, isLoading, isError, error } = useQuery<
    LocalUser | OAuthUser,
    AxiosError<CustomErrorResponse>
  >({
    queryKey: ['profile'],
    queryFn: fetchUserProfile,
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
