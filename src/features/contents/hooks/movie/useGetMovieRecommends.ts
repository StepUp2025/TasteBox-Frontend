import { useQuery } from '@tanstack/react-query';
import { fetchRecommends } from 'entities/contents/model';

export function useMovieRecommends(id: string | number) {
  return useQuery({
    queryKey: ['movies', id, 'recommends'],
    queryFn: () => fetchRecommends(id),
    enabled: !!id,
  });
}
