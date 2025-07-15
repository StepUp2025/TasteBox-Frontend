import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { updateProfile } from 'entities/user/model';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    AxiosResponse,
    AxiosError<CustomErrorResponse>,
    FormData
  >({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
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
