import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { removeCollectionContents } from 'entities/collection';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

type RemoveCollectionPayload = {
  collectionId: number;
  contentIds: number[];
};

export const useRemoveCollectionContents = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    string,
    AxiosError<CustomErrorResponse>,
    RemoveCollectionPayload
  >({
    mutationFn: ({ collectionId, contentIds }) =>
      removeCollectionContents(collectionId, contentIds),
    onSuccess: (_, { collectionId }) => {
      queryClient.invalidateQueries({
        queryKey: ['collections', collectionId],
      });
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};
