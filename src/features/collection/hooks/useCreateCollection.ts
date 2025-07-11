import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  CreateCollectionRequest,
  CreateCollectionResponse,
  createCollection,
} from 'entities/collection';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    CreateCollectionResponse,
    AxiosError<CustomErrorResponse>,
    CreateCollectionRequest
  >({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};
