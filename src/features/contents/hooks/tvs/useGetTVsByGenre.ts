import { useQuery } from '@tanstack/react-query';
import { fetchTVsByGenre } from 'entities/contents/model';
import { ContentsResponse } from 'entities/contents/model/types/contents.type';

export function useTVsByGenre(
  genreIds: number[] = [],
  page: number = 1,
  limit: number = 18,
) {
  return useQuery<ContentsResponse>({
    queryKey: ['tvs', genreIds, page, limit],
    queryFn: () => fetchTVsByGenre(genreIds, page, limit),
    enabled: genreIds.length > 0,
  });
}
