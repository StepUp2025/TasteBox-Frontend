import {
  Contents,
  ContentsResponse,
  ParameterTypes,
} from 'entities/contents/model/types/contents.type';
import { Movie } from 'entities/contents/model/types/movie.type';
import { TVs } from 'entities/contents/model/types/tvs.type';
import { Genre } from 'entities/genre/types/genre.type';
import { http } from 'msw';
import { createErrorResponse, createSuccessResponse } from '../utils/response';

export const mockGenres: Genre[] = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Drama' },
];

export const mockContents: Contents[] = [
  {
    id: 1,
    poster_path: '/images/poster1.jpg',
    title: 'Inception',
    contentType: 'movie',
  },

  {
    id: 2,
    poster_path: '/images/poster2.jpg',
    title: 'Interstellar',
    contentType: 'movie',
  },
  {
    id: 3,
    poster_path: '/images/poster3.jpg',
    title: 'Breaking Bad',
    contentType: 'tv',
  },
  {
    id: 4,
    poster_path: '/images/poster4.jpg',
    title: 'Stranger Things',
    contentType: 'tv',
  },
];

export const mockParameter: ParameterTypes = {
  genreId: 12,
  page: 1,
};

export const mockContentsResponse: ContentsResponse = {
  contents: mockContents,
  page: 1,
  totalPages: 5,
};

export const mockMovies: Movie[] = [
  {
    id: 1,
    poster_path: '/images/movie1.jpg',
    title: 'Mock Movie 1',
    contentType: 'movie',
    originalLanguage: 'en',
    voteAverage: 8.2,
    voteCount: 1234,
    backdropPath: '/images/movie1_backdrop.jpg',
    overview: 'This is a mock movie overview.',
    status: 'Released',
    genres: mockGenres,
    runtime: 120,
    releaseDate: '2024-01-01',
  },
  {
    id: 2,
    poster_path: '/images/movie2.jpg',
    title: 'Mock Movie 2',
    contentType: 'movie',
    originalLanguage: 'ko',
    voteAverage: 7.5,
    voteCount: 567,
    backdropPath: '/images/movie2_backdrop.jpg',
    overview: '이것은 또 다른 영화입니다.',
    status: 'Released',
    genres: [mockGenres[1]],
    runtime: 95,
    releaseDate: '2023-10-10',
  },
];

export const mockTVs: TVs[] = [
  {
    id: 101,
    poster_path: '/images/tv1.jpg',
    title: 'Mock TV Series 1',
    contentType: 'tv',
    originalLanguage: 'ko',
    voteAverage: 7.5,
    voteCount: 567,
    backdropPath: '/images/tv1_backdrop.jpg',
    overview: 'This is a mock TV series overview.',
    status: 'Returning Series',
    genres: mockGenres,
    firstAirDate: '2022-01-01',
    lastAirDate: '2023-01-01',
    numberOfSeasons: 2,
    seasons: [
      { id: 1, title: 'Season 1', poster_path: '/images/tv1_season1.jpg' },
      { id: 2, title: 'Season 2', poster_path: '/images/tv1_season2.jpg' },
    ],
  },
];

export const contentsHandlers = [
  // 장르별 영화 조회
  http.get('/movies/genre', ({ request }) => {
    const url = new URL(request.url);
    const genreId = Number(url.searchParams.get('genreId'));
    const filtered = mockMovies.filter((m) =>
      m.genres.some((g) => g.id === genreId),
    );
    return createSuccessResponse('장르별 영화 목록 조회 성공', {
      contents: filtered,
    });
  }),

  // 인기 영화
  http.get('/movies/popular', () => {
    return createSuccessResponse('인기 영화 목록 조회 성공', {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'movie'),
    });
  }),

  // 현재 상영작
  http.get('/movies/now-playing', () => {
    return createSuccessResponse('현재 상영작 목록 조회 성공', {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'movie'),
    });
  }),

  // 평점 높은 영화
  http.get('/movies/top-rated', () => {
    return createSuccessResponse('평점 높은 영화 목록 조회 성공', {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'movie'),
    });
  }),

  // 추천 영화 (id 기반)
  http.get('/movies/:id/recommends', () => {
    return createSuccessResponse('추천 영화 목록 조회 성공', {
      contents: mockMovies.slice(0, 1),
    });
  }),

  // 영화 상세
  http.get('/movies/:id', ({ params }) => {
    const movie = mockMovies.find((m) => m.id === Number(params.id));
    if (!movie) {
      return createErrorResponse(404, '영화를 찾을 수 없습니다.', 'NOT_FOUND');
    }
    return createSuccessResponse('영화 상세 조회 성공', movie);
  }),

  // 장르별 TV 조회
  http.get('/tvs/genre', ({ request }) => {
    const url = new URL(request.url);
    const genreId = Number(url.searchParams.get('genreId'));
    const filtered = mockTVs.filter((t) =>
      t.genres.some((g) => g.id === genreId),
    );
    return createSuccessResponse('장르별 TV 시리즈 목록 조회 성공', {
      contents: filtered,
    });
  }),

  // 인기 TV
  http.get('/tvs/popular', () => {
    return createSuccessResponse('인기 TV 시리즈 목록 조회 성공', {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'tv'),
    });
  }),

  // 현재 방영 중인 TV
  http.get('/tvs/on-the-air', () => {
    return createSuccessResponse('현재 방영 중인 TV 목록 조회 성공', {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'tv'),
    });
  }),

  // 평점 높은 TV
  http.get('/tvs/top-rated', () => {
    return createSuccessResponse('평점 높은 TV 시리즈 목록 조회 성공', {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'tv'),
    });
  }),

  // 추천 TV (id 기반)
  http.get('/tvs/:id/recommends', () => {
    return createSuccessResponse('추천 TV 시리즈 목록 조회 성공', {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'tv'),
    });
  }),

  // TV 상세
  http.get('/tvs/:id', ({ params }) => {
    const tv = mockTVs.find((t) => t.id === Number(params.id));
    if (!tv) {
      return createErrorResponse(
        404,
        'TV 시리즈를 찾을 수 없습니다.',
        'NOT_FOUND',
      );
    }
    return createSuccessResponse('TV 시리즈 상세 조회 성공', tv);
  }),
];
