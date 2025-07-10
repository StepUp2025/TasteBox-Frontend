import { useQuery } from '@tanstack/react-query';
import { fetchOnTheAirMovies } from 'entities/contents/model';

export function useOnTheAirMovies(page: number = 1, limit: number = 20) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', 'on-the-air', page, limit],
    queryFn: () => fetchOnTheAirMovies(page, limit),
  });
  return { data, isPending, isError, error, refetch };
}
