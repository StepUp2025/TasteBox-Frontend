import { useQuery } from '@tanstack/react-query';
import { fetchPopularTVs } from 'entities/contents/model';

export function usePopularTVs(page: number = 1) {
  return useQuery({
    queryKey: ['tvs', 'popular', page],
    queryFn: () => fetchPopularTVs(page),
  });
}
