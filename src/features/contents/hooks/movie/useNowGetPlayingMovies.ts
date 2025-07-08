import { useQuery } from '@tanstack/react-query';
import { fetchNowPlayingMovies } from 'entities/contents/model';

export function useNowPlayingMovies(page: number = 1) {
  return useQuery({
    queryKey: ['movies', 'now-playing', page],
    queryFn: () => fetchNowPlayingMovies(page),
  });
}
