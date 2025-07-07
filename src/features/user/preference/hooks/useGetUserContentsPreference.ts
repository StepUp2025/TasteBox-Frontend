import { useQuery } from '@tanstack/react-query';
import { ContentType } from 'entities/contents/model/types/contents.type';
import {
  fetchMoviePreference,
  fetchTVPreference,
  UserContentsPreference,
} from 'entities/user/model';

const fetchMap: Record<ContentType, () => Promise<UserContentsPreference>> = {
  movie: fetchMoviePreference,
  tv: fetchTVPreference,
};

export const useUserContentsPreference = (type: ContentType) => {
  const { data, isLoading, isError, error } = useQuery<UserContentsPreference>({
    queryKey: ['preference', type],
    queryFn: fetchMap[type],
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
