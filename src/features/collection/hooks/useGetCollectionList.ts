import { useQuery } from '@tanstack/react-query';
import { getCollectionList } from 'entities/collection';
import { GetCollectionResponse } from 'entities/collection/types/collection.type';

export const useGetCollectionList = () => {
  const { data, isLoading, isError, error, refetch } =
    useQuery<GetCollectionResponse>({
      queryKey: ['collections'],
      queryFn: getCollectionList,
    });

  return { data, isLoading, isError, error, refetch };
};
