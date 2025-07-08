import { useQuery } from '@tanstack/react-query';
import { fetchTopRatedMovies } from 'entities/contents/model';

export function useTopRatedMovies(page: number = 1) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', 'top-rated', page],
    queryFn: () => fetchTopRatedMovies(page),
  });
  return { data, isPending, isError, error, refetch };
}
