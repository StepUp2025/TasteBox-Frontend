import { useQuery } from '@tanstack/react-query';
import { fetchTopRatedTVs } from 'entities/contents/model';

export function useTopRatedTVs(page: number = 1) {
  return useQuery({
    queryKey: ['tvs', 'top-rated', page],
    queryFn: () => fetchTopRatedTVs(page),
  });
}
