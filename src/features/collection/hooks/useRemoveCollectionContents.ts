import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ModifyContentsRequest,
  removeCollectionContents,
} from 'entities/collection';

export const useRemoveCollectionContents = (id: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    unknown,
    ModifyContentsRequest
  >({
    mutationFn: (body) => removeCollectionContents(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', id] });
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};
