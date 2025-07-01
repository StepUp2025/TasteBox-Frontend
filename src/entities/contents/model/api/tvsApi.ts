import { TVsResponse, TVsDetail } from "../types/tvs.type"
import { authClient, httpClient } from "shared/api";
import { ContentsTypes } from "../types/Contents.type";

// 장르별 TV 조회
export const fetchTVsByGenre = async (data: ContentsTypes) => {
  const response = await authClient.get<TVsResponse>("/tvs/genre", {params: {data} });
  return response.data;
};

// 인기 TV 조회
export const fetchPopularTVs = async (page: number = 1) => {
  const response = await httpClient.get<TVsResponse>("/tvs/popular", {
    params: { page }
  });
  return response.data;
};

// 현재 방영 중인 TV 조회
export const fetchOnTheAirTVs = async (page: number = 1) => {
  const response = await httpClient.get<TVsResponse>("/tvs/on-the-air", {
    params: { page }
  });
  return response.data;
};

// 평점 높은 TV 조회
export const fetchTopRatedTVs = async (page: number = 1) => {
  const response = await httpClient.get<TVsResponse>("/tvs/top-rated", {
    params: { page }
  });
  return response.data;
};

// TV 상세 정보 조회
export const fetchTVsDetail = async (id: number) => {
  const response = await httpClient.get<TVsDetail>(`/tvs/${id}`);
  return response.data;
};

// TV 추천 목록 조회
export const fetchRecommendsTVs = async (id: string | number) => {
  const response = await authClient.get<TVsResponse>(`/tvs/${id}/recommends`);
  return response.data;
};
