import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { removeCollectionContents } from 'entities/collection';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useRemoveCollectionContents = (id: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    string,
    AxiosError<CustomErrorResponse>,
    number[]
  >({
    mutationFn: (contentIds) => removeCollectionContents(id, contentIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', id] });
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};
