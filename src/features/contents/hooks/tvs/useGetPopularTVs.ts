import { useQuery } from '@tanstack/react-query';
import { fetchPopularTVs } from 'entities/contents/model';

export function usePopularTVs(page: number = 1, limit: number = 20) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['tvs', 'popular', page, limit],
    queryFn: () => fetchPopularTVs(page, limit),
  });
  return { data, isPending, isError, error, refetch };
}
