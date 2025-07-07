import { useQuery } from '@tanstack/react-query';
import { fetchTopRatedMovies } from 'entities/contents/model';

export function useTopRatedMovies(page: number = 1) {
  return useQuery({
    queryKey: ['movies', 'top-rated', page],
    queryFn: () => fetchTopRatedMovies(page),
  });
}
