import { authClient } from 'shared/api';
import { LatestResponse } from '../types/contents.type';

// 최근 추가한 컨텐츠 조회
export const fetchLatestContents = async (limit: number = 10) => {
  const response = await authClient.get<LatestResponse>('/contents/latest', {
    params: { limit },
  });
  return response.data;
};
