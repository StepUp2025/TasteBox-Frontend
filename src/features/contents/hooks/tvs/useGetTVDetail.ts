import { useQuery } from '@tanstack/react-query';
import { fetchTVDetail } from 'entities/contents/model';

export function useTVDetail(id: number) {
  return useQuery({
    queryKey: ['tvs', 'detail', id],
    queryFn: () => fetchTVDetail(id),
    enabled: !!id,
  });
}
