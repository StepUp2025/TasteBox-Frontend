import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateCollectionRequest,
  CreateCollectionResponse,
  createCollection,
} from 'entities/collection';

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    CreateCollectionResponse,
    unknown,
    CreateCollectionRequest
  >({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};
