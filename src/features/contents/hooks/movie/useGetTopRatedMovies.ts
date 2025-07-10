import { useQuery } from '@tanstack/react-query';
import { fetchTopRatedMovies } from 'entities/contents/model';

export function useTopRatedMovies(page: number = 1, limit: number = 20) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', 'top-rated', page, limit],
    queryFn: () => fetchTopRatedMovies(page, limit),
  });
  return { data, isPending, isError, error, refetch };
}
