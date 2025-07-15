import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteCollection } from 'entities/collection';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    string,
    AxiosError<CustomErrorResponse>,
    number
  >({
    mutationFn: (id) => deleteCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};
