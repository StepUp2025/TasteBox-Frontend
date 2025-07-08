import { useQuery } from '@tanstack/react-query';
import { fetchMoviesByGenre } from 'entities/contents/model';
import { ParameterTypes } from 'entities/contents/model/types/contents.type';

export function useMoviesByGenre(params: ParameterTypes) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', 'genre', params],
    queryFn: () => fetchMoviesByGenre(params),
    enabled: !!params,
  });
  return { data, isPending, isError, error, refetch };
}
