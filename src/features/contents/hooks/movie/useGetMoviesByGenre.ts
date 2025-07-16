import { useQuery } from '@tanstack/react-query';
import { fetchMoviesByGenre } from 'entities/contents/model';
import { ContentsResponse } from 'entities/contents/model/types/contents.type';

export function useMoviesByGenre(genreId: number[], page = 1, limit = 18) {
  return useQuery<ContentsResponse>({
    queryKey: ['movies', genreId, page, limit],
    queryFn: () => fetchMoviesByGenre(genreId, page, limit),
  });
}
