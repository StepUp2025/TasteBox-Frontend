import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { logout } from 'entities/auth/model';
import { useAuthStore } from 'entities/auth/model/store/authStore';
import { useNavigate } from 'react-router-dom';
import { queryClient } from 'shared/lib/queryClient';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useLogout = (option?: {
  onSuccess?: () => void;
  onError?: (error: AxiosError<CustomErrorResponse>) => void;
}) => {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    AxiosError<CustomErrorResponse>,
    void
  >({
    mutationFn: logout,
    onSuccess: () => {
      // 1. 클라이언트 상태 초기화 (예: 토큰 삭제)
      useAuthStore.getState().resetAccessToken();
      // 2. 리다이렉트 , 뒤로가기 방지
      navigate('/', { replace: true });
      // 3. 캐시 초기화
      queryClient.clear();
      console.log('Successfully logged out');
      option?.onSuccess?.();
    },
    onError: (error) => {
      console.error('Logout failed', error);
      option?.onError?.(error);
    },
  });
  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
