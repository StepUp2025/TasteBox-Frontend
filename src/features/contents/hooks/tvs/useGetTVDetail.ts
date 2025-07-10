import { useQuery } from '@tanstack/react-query';
import { fetchTVDetail } from 'entities/contents/model';

export function useTVDetail(id: number) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['tvs', 'detail', id],
    queryFn: () => fetchTVDetail(id),
    enabled: !!id,
  });
  return { data, isPending, isError, error, refetch };
}
