import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UpdateCollectionRequest, updateCollection } from 'entities/collection';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useUpdateCollection = (id: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    string,
    AxiosError<CustomErrorResponse>,
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
