import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail } from 'entities/contents/model';

export function useMovieDetail(id: number) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['moives', 'detail', id],
    queryFn: () => fetchMovieDetail(id),
    enabled: !!id,
  });

  return { data, isPending, isError, error, refetch };
}
