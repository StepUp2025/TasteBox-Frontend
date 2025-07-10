import { useQuery } from '@tanstack/react-query';
import { fetchLatestContents } from 'entities/contents/model/api/latest';

export function useLatestContents(limit: number = 10) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['contents', 'recent', limit],
    queryFn: () => fetchLatestContents(limit),
  });
  return { data, isPending, isError, error, refetch };
}
