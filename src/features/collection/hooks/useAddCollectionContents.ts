import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { addCollectionContents } from 'entities/collection';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useAddCollectionContents = (id: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    string,
    AxiosError<CustomErrorResponse>,
    number[]
  >({
    mutationFn: (contentIds) => addCollectionContents(id, contentIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', id] });
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};
