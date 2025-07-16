import { useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from 'entities/contents/model';

export function usePopularMovies(page: number = 1, limit: number = 18) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', 'popular', page, limit],
    queryFn: () => fetchPopularMovies(page, limit),
    staleTime: 1000 * 60 * 5,
  });
  return { data, isPending, isError, error, refetch };
}
