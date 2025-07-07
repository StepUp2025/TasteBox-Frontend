import { useQuery } from '@tanstack/react-query';
import { fetchRecommendsTVs } from 'entities/contents/model';

export function useRecommendsTVs(id: string | number) {
  return useQuery({
    queryKey: ['tvs', id, 'recommends'],
    queryFn: () => fetchRecommendsTVs(id),
    enabled: !!id,
  });
}
