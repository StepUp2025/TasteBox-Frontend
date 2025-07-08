import { useQuery } from '@tanstack/react-query';
import { fetchNowPlayingMovies } from 'entities/contents/model';

export function useNowPlayingMovies(page: number = 1) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['movies', 'now-playing', page],
    queryFn: () => fetchNowPlayingMovies(page),
  });
  return { data, isPending, isError, error, refetch };
}
