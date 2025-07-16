import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ContentType } from 'entities/contents/model/types/contents.type';
import {
  fetchMoviePreference,
  fetchTVPreference,
  UserContentsPreference,
} from 'entities/user/model';
import { useEffect } from 'react';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

const fetchMap: Record<ContentType, () => Promise<UserContentsPreference>> = {
  movie: fetchMoviePreference,
  tv: fetchTVPreference,
};

export const useUserContentsPreference = (
  type: ContentType,
  option?: {
    onSuccess?: (data: UserContentsPreference) => void;
    onError?: (error: AxiosError<CustomErrorResponse>) => void;
  },
) => {
  const { data, isLoading, isError, error } = useQuery<
    UserContentsPreference,
    AxiosError<CustomErrorResponse>
  >({
    queryKey: ['preference', type],
    queryFn: fetchMap[type],
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
