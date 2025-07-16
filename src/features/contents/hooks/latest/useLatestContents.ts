import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from 'entities/auth/model/store/authStore';
import { fetchLatestContents } from 'entities/contents/model/api/latestApi';

export function useLatestContents(limit: number = 10) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['contents', 'latest', limit],
    queryFn: () => fetchLatestContents(limit),
    enabled: isLoggedIn, // 로그인 상태에서만 데이터 요청,
  });
  return { data, isPending, isError, error, refetch };
}
