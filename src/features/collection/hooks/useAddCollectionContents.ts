import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { addCollectionContents } from 'entities/collection';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useAddCollectionContents = (contentId: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    string,
    AxiosError<CustomErrorResponse>,
    number
  >({
    mutationFn: (collectionId) =>
      addCollectionContents(collectionId, contentId),
    onSuccess: (_, collectionId) => {
      queryClient.invalidateQueries({
        queryKey: ['collections', collectionId],
      });
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};
