import { authClient, httpClient } from 'shared/api';
import { ContentsResponse } from '../types/contents.type';
import { TVs } from '../types/tvs.type';

// 장르별 TV 조회
export const fetchTVsByGenre = async (
  genreIds: number[] = [],
  page: number = 1,
  limit: number = 18,
): Promise<ContentsResponse> => {
  const response = await authClient.get<ContentsResponse>('/tvs/genre', {
    params: { genreId: genreIds, page, limit },
  });
  return response.data;
};

// 인기 TV 조회
export const fetchPopularTVs = async (page: number = 1, limit: number = 18) => {
  const response = await httpClient.get<ContentsResponse>('/tvs/popular', {
    params: { page, limit },
  });
  return response.data;
};

// 현재 방영 중인 TV 조회
export const fetchOnTheAirTVs = async (
  page: number = 1,
  limit: number = 18,
) => {
  const response = await httpClient.get<ContentsResponse>('/tvs/on-the-air', {
    params: { page, limit },
  });
  return response.data;
};

// 평점 높은 TV 조회
export const fetchTopRatedTVs = async (
  page: number = 1,
  limit: number = 18,
) => {
  const response = await httpClient.get<ContentsResponse>('/tvs/top-rated', {
    params: { page, limit },
  });
  return response.data;
};

// TV 상세 정보 조회
export const fetchTVDetail = async (id: number) => {
  const response = await httpClient.get<TVs>(`/tvs/${id}`);
  return response.data;
};

// TV 추천 목록 조회
export const fetchRecommendsTVs = async (
  id: string | number,
  page: number = 1,
  limit: number = 18,
) => {
  const response = await authClient.get<ContentsResponse>(
    `/tvs/${id}/recommends`,
    { params: { page, limit } },
  );
  return response.data;
};
