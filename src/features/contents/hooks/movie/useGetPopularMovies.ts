import { useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from 'entities/contents/model';

export function usePopularMovies(page: number = 1) {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => fetchPopularMovies(page),
  });
}
