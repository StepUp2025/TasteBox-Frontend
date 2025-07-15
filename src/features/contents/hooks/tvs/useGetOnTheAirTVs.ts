import { useQuery } from '@tanstack/react-query';
import { fetchOnTheAirTVs } from 'entities/contents/model';

export function useOnTheAirTVs(page: number = 1, limit: number = 18) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['tvs', 'on-the-air', page, limit],
    queryFn: () => fetchOnTheAirTVs(page, limit),
  });
  return { data, isPending, isError, error, refetch };
}
