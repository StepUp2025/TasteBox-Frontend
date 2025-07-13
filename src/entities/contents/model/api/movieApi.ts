import { authClient, httpClient } from 'shared/api';
import { ContentsResponse } from '../types/contents.type';
import { Movie } from '../types/movie.type';

// 장르별 영화 조회
export const fetchMoviesByGenre = async (
  genreIds: number[] = [],
  page: number = 1,
  limit: number = 18,
) => {
  const response = await authClient.get('/movies/genre', {
    params: { genreId: genreIds, page, limit },
  });
  return response.data;
};

// 인기 영화
export const fetchPopularMovies = async (
  page: number = 1,
  limit: number = 18,
) => {
  const response = await httpClient.get<ContentsResponse>('/movies/popular', {
    params: { page, limit },
  });
  return response.data;
};

// 현재 상영작
export const fetchOnTheAirMovies = async (
  page: number = 1,
  limit: number = 18,
) => {
  const response = await httpClient.get<ContentsResponse>(
    '/movies/on-the-air',
    { params: { page, limit } },
  );
  return response.data;
};

// 평점 높은 영화
export const fetchTopRatedMovies = async (
  page: number = 1,
  limit: number = 18,
) => {
  const response = await httpClient.get<ContentsResponse>('/movies/top-rated', {
    params: { page, limit },
  });
  return response.data;
};

// 추천 영화
export const fetchRecommends = async (
  id: string | number,
  page: number = 1,
  limit: number = 18,
) => {
  const response = await authClient.get<ContentsResponse>(
    `/movies/${id}/recommends`,
    { params: { page, limit } },
  );
  return response.data;
};

// 영화 상세 정보
export const fetchMovieDetail = async (id: number) => {
  const response = await httpClient.get<Movie>(`/movies/${id}`);
  return response.data;
};
