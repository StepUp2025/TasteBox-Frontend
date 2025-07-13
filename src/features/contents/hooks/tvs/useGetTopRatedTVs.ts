import { useQuery } from '@tanstack/react-query';
import { fetchTopRatedTVs } from 'entities/contents/model';

export function useTopRatedTVs(page: number = 1, limit: number = 18) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['tvs', 'top-rated', page, limit],
    queryFn: () => fetchTopRatedTVs(page, limit),
  });
  return { data, isPending, isError, error, refetch };
}
