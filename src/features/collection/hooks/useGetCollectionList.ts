import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getCollectionList } from 'entities/collection';
import { GetCollectionsResponse } from 'entities/collection/types/collection.type';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useGetCollectionList = () => {
  const { data, isPending, isError, error, refetch } = useQuery<
    GetCollectionsResponse,
    AxiosError<CustomErrorResponse>
  >({
    queryKey: ['collections'],
    queryFn: getCollectionList,
  });

  return { data, isPending, isError, error, refetch };
};
