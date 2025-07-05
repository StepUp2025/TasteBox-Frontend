import { useQuery } from '@tanstack/react-query';
import { GenreResponse, getTVSeriesGenres } from 'entities/genre';

export const useGetTVSeriesGenres = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<GenreResponse>({
    queryKey: ['genres', 'tvs'],
    queryFn: getTVSeriesGenres,
  });

  return { data, isLoading, isError, error, refetch };
};
