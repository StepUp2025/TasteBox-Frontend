import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  UserPreferenceUpdateType,
  updatePreference,
} from 'entities/user/model';

export const useUpdateUserPreference = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    unknown,
    UserPreferenceUpdateType
  >({
    mutationFn: updatePreference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preference'] });
    },
    onError: (error) => {
      console.error('취향 업데이트 실패:', error);
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
