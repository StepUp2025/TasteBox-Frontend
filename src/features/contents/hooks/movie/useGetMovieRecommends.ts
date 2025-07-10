import { useQuery } from '@tanstack/react-query';
import { fetchRecommends } from 'entities/contents/model';

export function useMovieRecommends(id: string | number) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', id, 'recommends'],
    queryFn: () => fetchRecommends(id),
    enabled: !!id,
  });
  return { data, isPending, isError, error, refetch };
}
