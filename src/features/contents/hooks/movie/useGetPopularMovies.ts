import { useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from 'entities/contents/model';

export function usePopularMovies(page: number = 1) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => fetchPopularMovies(page),
  });
  return { data, isPending, isError, error, refetch };
}
