import { useQuery } from '@tanstack/react-query';
import { fetchTVsByGenre } from 'entities/contents/model';
import { ParameterTypes } from 'entities/contents/model/types/contents.type';

export function useTVsByGenre(params: ParameterTypes) {
  return useQuery({
    queryKey: ['tvs', 'genre', params],
    queryFn: () => fetchTVsByGenre(params),
    enabled: !!params,
  });
}
