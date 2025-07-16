import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  UserPreferenceUpdateType,
  updatePreference,
} from 'entities/user/model';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useUpdateUserPreference = (option?: {
  onSuccess?: () => void;
  onError?: (error: AxiosError<CustomErrorResponse>) => void;
}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    AxiosError<CustomErrorResponse>,
    UserPreferenceUpdateType
  >({
    mutationFn: updatePreference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preference'] });
      option?.onSuccess?.();
    },
    onError: (error) => {
      console.error('취향 업데이트 실패:', error);
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
