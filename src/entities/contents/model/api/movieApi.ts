import { authClient, httpClient } from 'shared/api';
import { ContentsResponse, ParameterTypes } from '../types/contents.type';
import { Movie } from '../types/movie.type';

// 장르별 영화 조회
export const fetchMoviesByGenre = async (data: ParameterTypes) => {
  const response = await authClient.get<ContentsResponse>('/movies/genre', {
    params: data,
  });
  return response.data;
};

// 인기 영화
export const fetchPopularMovies = async (page: number = 1) => {
  const response = await httpClient.get<ContentsResponse>('/movies/popular', {
    params: { page },
  });
  return response.data;
};

// 현재 상영작
export const fetchNowPlayingMovies = async (page: number = 1) => {
  const response = await httpClient.get<ContentsResponse>(
    '/movies/now-playing',
    { params: { page } },
  );
  return response.data;
};

// 평점 높은 영화
export const fetchTopRatedMovies = async (page: number = 1) => {
  const response = await httpClient.get<ContentsResponse>('/movies/top-rated', {
    params: { page },
  });
  return response.data;
};

// 추천 영화
export const fetchRecommends = async (id: string | number) => {
  const response = await authClient.get<ContentsResponse>(
    `/movies/${id}/recommends`,
  );
  return response.data;
};

// 영화 상세 정보
export const fetchMovieDetail = async (id: number) => {
  const response = await httpClient.get<Movie>(`/movies/${id}`);
  return response.data;
};
