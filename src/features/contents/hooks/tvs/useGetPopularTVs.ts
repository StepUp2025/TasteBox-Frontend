import { useQuery } from '@tanstack/react-query';
import { fetchPopularTVs } from 'entities/contents/model';

export function usePopularTVs(page: number = 1) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['tvs', 'popular', page],
    queryFn: () => fetchPopularTVs(page),
  });
  return { data, isPending, isError, error, refetch };
}
