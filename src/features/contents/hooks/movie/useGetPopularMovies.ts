import { useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from 'entities/contents/model';

export function usePopularMovies(page: number = 1, limit: number = 20) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', 'popular', page, limit],
    queryFn: () => fetchPopularMovies(page, limit),
  });
  return { data, isPending, isError, error, refetch };
}
