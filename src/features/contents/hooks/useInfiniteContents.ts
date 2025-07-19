import { useInfiniteQuery } from '@tanstack/react-query';
import { ContentsResponse } from 'entities/contents/model';
import { LIMIT, PAGE } from 'entities/contents/model/api/constants';

interface Props {
  queryKey: (string | unknown)[];
  queryFn: (page: number, limit: number) => Promise<ContentsResponse>;
  limit?: number;
}

export function useInfiniteContents({
  queryKey,
  queryFn,
  limit = LIMIT,
}: Props) {
  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = PAGE }) => {
      const res = await queryFn(pageParam, limit);
      return res; //  ContentsResponse { contents, page, totalPages }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },

    initialPageParam: 1,
  });
}
