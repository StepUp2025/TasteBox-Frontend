import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail } from 'entities/contents/model';

export function useMovieDetail(id: number) {
  return useQuery({
    queryKey: ['tvs', 'detail', id],
    queryFn: () => fetchMovieDetail(id),
    enabled: !!id,
  });
}
