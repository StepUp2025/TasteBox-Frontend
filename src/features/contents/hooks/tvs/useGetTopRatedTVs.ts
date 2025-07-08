import { useQuery } from '@tanstack/react-query';
import { fetchTopRatedTVs } from 'entities/contents/model';

export function useTopRatedTVs(page: number = 1) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['tvs', 'top-rated', page],
    queryFn: () => fetchTopRatedTVs(page),
  });
  return { data, isPending, isError, error, refetch };
}
