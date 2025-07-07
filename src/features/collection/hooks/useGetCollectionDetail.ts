import { useQuery } from '@tanstack/react-query';
import {
  GetCollectionDetailResponse,
  getCollectionDetail,
} from 'entities/collection';

export const useGetCollectionDetail = (id: number) => {
  const { data, isPending, isError, error, refetch } =
    useQuery<GetCollectionDetailResponse>({
      queryKey: ['collections', id],
      queryFn: () => getCollectionDetail(id),
      enabled: !!id,
    });

  return { data, isPending, isError, error, refetch };
};
