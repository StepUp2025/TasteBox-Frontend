import { useQuery } from '@tanstack/react-query';
import { fetchMoviesByGenre } from 'entities/contents/model';
import { ParameterTypes } from 'entities/contents/model/types/contents.type';

export function useMoviesByGenre(
  params: ParameterTypes,
  page: number = 1,
  limit: number = 20,
) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', 'genre', params, page, limit],
    queryFn: () => fetchMoviesByGenre(params, page, limit),
    enabled: !!params,
  });
  return { data, isPending, isError, error, refetch };
}
