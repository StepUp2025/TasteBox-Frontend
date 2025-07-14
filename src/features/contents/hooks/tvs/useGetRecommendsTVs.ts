import { useQuery } from '@tanstack/react-query';
import { fetchRecommendsTVs } from 'entities/contents/model';

export function useRecommendsTVs(
  id: string | number,
  page: number = 1,
  limit: number = 18,
) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['tvs', id, 'recommends', page, limit],
    queryFn: () => fetchRecommendsTVs(id, page, limit),
    enabled: !!id,
  });
  return { data, isPending, isError, error, refetch };
}
