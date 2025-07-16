import { ContentsResponse } from 'entities/contents/model/types/contents.type';
import { authClient } from 'shared/api';

// 최근 추가한 컨텐츠 조회
export const fetchLatestContents = async (limit: number = 10) => {
  const response = await authClient.get<ContentsResponse>('/contents/latest', {
    params: { limit },
  });
  return response.data;
};
