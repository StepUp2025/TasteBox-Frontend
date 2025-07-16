import { useQuery } from '@tanstack/react-query';
import { fetchTVsByGenre } from 'entities/contents/model';
import { ContentsResponse } from 'entities/contents/model/types/contents.type';

export function useTVsByGenre(
  genreId: number[] = [],
  page: number = 1,
  limit: number = 18,
) {
  return useQuery<ContentsResponse>({
    queryKey: ['tvs', genreId, page, limit],
    queryFn: () => fetchTVsByGenre(genreId, page, limit),
    enabled: genreId.length > 0,
  });
}
