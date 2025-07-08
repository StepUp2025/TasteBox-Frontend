import { useQuery } from '@tanstack/react-query';
import { fetchMoviesByGenre } from 'entities/contents/model';
import { ParameterTypes } from 'entities/contents/model/types/contents.type';

export function useMoviesByGenre(params: ParameterTypes) {
  return useQuery({
    queryKey: ['movies', 'genre', params],
    queryFn: () => fetchMoviesByGenre(params),
    enabled: !!params,
  });
}
