import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileUpdateType, updateProfile } from 'entities/user/model';

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    unknown,
    ProfileUpdateType
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
