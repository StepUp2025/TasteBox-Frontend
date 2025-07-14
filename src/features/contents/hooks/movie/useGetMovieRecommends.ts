import { useQuery } from '@tanstack/react-query';
import { fetchRecommends } from 'entities/contents/model';

export function useMovieRecommends(
  id: string | number,
  page: number = 1,
  limit: number = 18,
) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', id, 'recommends', page, limit],
    queryFn: () => fetchRecommends(id, page, limit),
    enabled: !!id,
  });
  return { data, isPending, isError, error, refetch };
}
