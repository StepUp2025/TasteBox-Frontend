import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addCollectionContents,
  ModifyContentsRequest,
} from 'entities/collection';

export const useAddCollectionContents = (id: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    unknown,
    ModifyContentsRequest
  >({
    mutationFn: (body) => addCollectionContents(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', id] });
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};
