import { useQuery } from '@tanstack/react-query';
import { fetchLatestContents } from 'entities/contents/model/api/latestApi';

export function useLatestContents(limit: number = 20) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['contents', 'latest', limit],
    queryFn: () => fetchLatestContents(limit),
  });
  return { data, isPending, isError, error, refetch };
}
