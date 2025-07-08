import { useQuery } from '@tanstack/react-query';
import { fetchOnTheAirTVs } from 'entities/contents/model';

export function useOnTheAirTVs(page: number = 1) {
  return useQuery({
    queryKey: ['tvs', 'on-the-air', page],
    queryFn: () => fetchOnTheAirTVs(page),
  });
}
