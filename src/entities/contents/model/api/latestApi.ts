import { ContentsResponse } from 'entities/contents/model/types/contents.type';
import { httpClient } from 'shared/api';

//최근 추가한 컨텐츠 조회
export const fetchLatestContents = async (limit: number = 18) => {
  const response = await httpClient.get<ContentsResponse>('/contents/latest', {
    params: { limit },
  });
  return response.data;
};
