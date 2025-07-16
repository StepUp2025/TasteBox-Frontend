import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { updateProfile } from 'entities/user/model';
import {
  CustomErrorResponse,
  CustomValidationErrorResponse,
} from 'shared/types/CustomErrorResponse';

export const useUpdateUserProfile = (option?: {
  onSuccess?: () => void;
  onError?: (
    error: AxiosError<CustomErrorResponse | CustomValidationErrorResponse>,
  ) => void;
}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    AxiosResponse,
    AxiosError<CustomErrorResponse | CustomValidationErrorResponse>,
    FormData
  >({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      option?.onSuccess?.();
    },
    onError: (err) => {
      console.error('프로필 업데이트 실패:', err);
      option?.onError?.(err);
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
