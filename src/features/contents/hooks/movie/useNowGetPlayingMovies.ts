import { useQuery } from '@tanstack/react-query';
import { fetchNowPlayingMovies } from 'entities/contents/model';

export function useNowPlayingMovies(page: number = 1, limit: number = 18) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', 'on-the-air', page, limit],
    queryFn: () => fetchNowPlayingMovies(page, limit),
  });
  return { data, isPending, isError, error, refetch };
}
