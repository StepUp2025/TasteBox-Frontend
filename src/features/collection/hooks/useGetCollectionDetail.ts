import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  GetCollectionDetailResponse,
  getCollectionDetail,
} from 'entities/collection';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useGetCollectionDetail = (id: number) => {
  const { data, isPending, isError, error, refetch } = useQuery<
    GetCollectionDetailResponse,
    AxiosError<CustomErrorResponse>
  >({
    queryKey: ['collections', id],
    queryFn: () => getCollectionDetail(id),
    enabled: !!id,
  });

  return { data, isPending, isError, error, refetch };
};
