import { useQuery } from '@tanstack/react-query';
import { fetchMoviesByGenre } from 'entities/contents/model';
import { ContentsResponse } from 'entities/contents/model/types/contents.type';

export function useMoviesByGenre(genreIds: number[], page = 1, limit = 18) {
  return useQuery<ContentsResponse>({
    queryKey: ['movies', genreIds, page, limit],
    queryFn: () => fetchMoviesByGenre(genreIds, page, limit),
    enabled: genreIds.length > 0,
  });
}
