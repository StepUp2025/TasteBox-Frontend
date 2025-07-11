import { useQuery } from '@tanstack/react-query';
import { fetchTVsByGenre } from 'entities/contents/model';
import { ParameterTypes } from 'entities/contents/model/types/contents.type';

export function useTVsByGenre(
  params: ParameterTypes,
  page: number = 1,
  limit: number = 20,
) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['tvs', 'genre', params, page, limit],
    queryFn: () => fetchTVsByGenre(params, page, limit),
    enabled: !!params,
  });
  return { data, isPending, isError, error, refetch };
}
