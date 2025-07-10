import { useQuery } from '@tanstack/react-query';
import { fetchRecommendsTVs } from 'entities/contents/model';

export function useRecommendsTVs(id: string | number) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['tvs', id, 'recommends'],
    queryFn: () => fetchRecommendsTVs(id),
    enabled: !!id,
  });
  return { data, isPending, isError, error, refetch };
}
