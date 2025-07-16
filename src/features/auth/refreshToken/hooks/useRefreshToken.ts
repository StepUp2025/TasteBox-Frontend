import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { refreshToken } from 'entities/auth/model/services/authApi';
import { useAuthStore } from 'entities/auth/model/store/authStore';
import { RefereshTokenResponse } from 'entities/auth/model/types/auth.type';
import { useCallback } from 'react';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useRefreshToken = (option?: {
  onSuccess?: () => void;
  onError?: (error: AxiosError<CustomErrorResponse>) => void;
}) => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const resetAccessToken = useAuthStore((state) => state.resetAccessToken);

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation<
    RefereshTokenResponse,
    AxiosError<CustomErrorResponse>,
    void
  >({
    mutationFn: refreshToken,
  });
  //  useCallback을 사용하여 함수 메모이제이션(함수 주소 저장)
  const refresh = useCallback(async () => {
    try {
      const res = await mutateAsync();
      setAccessToken(res.accessToken);
      option?.onSuccess?.();
      return res.accessToken;
    } catch (err) {
      resetAccessToken();
      option?.onError?.(err as AxiosError<CustomErrorResponse>);
      throw err;
    }
  }, [
    mutateAsync,
    setAccessToken,
    resetAccessToken,
    option?.onSuccess,
    option?.onError,
  ]); //  의존성 정확히 명시

  return { refresh, isPending, isError, isSuccess, error };
};
