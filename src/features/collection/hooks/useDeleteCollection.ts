import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCollection } from 'entities/collection';

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    unknown,
    number
  >({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};
