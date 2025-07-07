import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateCollectionRequest, updateCollection } from 'entities/collection';

export const useUpdateCollection = (id: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    unknown,
    UpdateCollectionRequest
  >({
    mutationFn: (body) => updateCollection(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collections', id] });
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};
