import { useQuery } from '@tanstack/react-query';
import { fetchOnTheAirTVs } from 'entities/contents/model';

export function useOnTheAirTVs(page: number = 1) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['tvs', 'on-the-air', page],
    queryFn: () => fetchOnTheAirTVs(page),
  });
  return { data, isPending, isError, error, refetch };
}
