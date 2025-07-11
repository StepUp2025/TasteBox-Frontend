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
    posterPath:
      'https://www.themoviedb.org/t/p/w1280/zTgjeblxSLSvomt6F6UYtpiD4n7.jpg',
    title: 'Inception',
    contentType: 'movie',
  },
  {
    id: 2,
    posterPath:
      'https://www.themoviedb.org/t/p/w1280/ygr4hE8Qpagv8sxZbMw1mtYkcQE.jpg',
    title: '쥬라기 월드: 새로운 시작',
    contentType: 'movie',
  },
  {
    id: 3,
    posterPath: null,
    title: 'Inception',
    contentType: 'movie',
  },

  {
    id: 4,
    posterPath:
      'https://www.themoviedb.org/t/p/w1280/evoEi8SBSvIIEveM3V6nCJ6vKj8.jpg',
    title: 'Interstellar',
    contentType: 'movie',
  },
  {
    id: 1,
    posterPath:
      'https://www.themoviedb.org/t/p/w1280/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
    title: 'Breaking Bad',
    contentType: 'tv',
  },
  {
    id: 2,
    posterPath: null,
    title: 'Breaking Bad',
    contentType: 'tv',
  },
  {
    id: 3,
    posterPath:
      'https://www.themoviedb.org/t/p/w1280/yACIAqAkSLkX4coHafpyLWAtQjw.jpg',
    title: 'Squid Game',
    contentType: 'tv',
  },
  {
    id: 4,
    posterPath:
      'https://www.themoviedb.org/t/p/w1280/yz4r477D8lljEF7xorrv3zvQxls.jpg',
    title: 'Stranger Things',
    contentType: 'tv',
  },
];

export const mockParameter: ParameterTypes = {
  genreId: 12,
  page: 1,
  limit: 20,
};

export const mockContentsResponse: ContentsResponse = {
  contents: mockContents,
  page: 1,
  totalPages: 5,
  limit: 20,
};

export const mockMovies: Movie[] = [
  {
    id: 1,
    posterPath:
      'https://www.themoviedb.org/t/p/w1280/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg',
    title: ' The Shawshank Redemption',
    contentType: 'movie',
    originalLanguage: 'en',
    voteAverage: 8.2,
    voteCount: 1234,
    backdropPath:
      'https://www.themoviedb.org/t/p/w1280/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg',
    overview: 'This is a mock movie overview.',
    status: 'Released',
    genres: mockGenres,
    runtime: 120,
    releaseDate: '2024-01-01',
  },
  {
    id: 2,
    posterPath: null,
    title: 'Mock Movie 2',
    contentType: 'movie',
    originalLanguage: 'ko',
    voteAverage: 7.5,
    voteCount: 567,
    backdropPath: null,
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
    posterPath:
      'https://www.themoviedb.org/t/p/w1280/bq3Emv3pJLUyHvwGqiAXRwJvAmL.jpg',
    title: '나 혼자 산다',
    contentType: 'tv',
    originalLanguage: 'ko',
    voteAverage: 7.5,
    voteCount: 567,
    backdropPath:
      'https://www.themoviedb.org/t/p/w1280/bq3Emv3pJLUyHvwGqiAXRwJvAmL.jpg',
    overview: 'This is a mock TV series overview.',
    status: 'Returning Series',
    genres: mockGenres,
    firstAirDate: '2022-01-01',
    lastAirDate: '2023-01-01',
    numberOfSeasons: 2,
    seasons: [
      {
        id: 1,
        title: 'Season 1',
        posterPath:
          'https://www.themoviedb.org/t/p/w1280/bq3Emv3pJLUyHvwGqiAXRwJvAmL.jpg',
      },
      {
        id: 2,
        title: 'Season 2',
        posterPath:
          'https://www.themoviedb.org/t/p/w1280/bq3Emv3pJLUyHvwGqiAXRwJvAmL.jpg',
      },
    ],
  },
];

export const contentsHandlers = [
  // 최근 추가한 컨텐츠 (전체)
  http.get('/contents/latest', () => {
    const sorted = [...mockContents].sort((a, b) => b.id - a.id);
    return createSuccessResponse(undefined, {
      ...mockContentsResponse,
      contents: sorted,
    });
  }),

  // 장르별 영화 조회
  http.get('/movies/genre', ({ request }) => {
    const url = new URL(request.url);
    const genreId = Number(url.searchParams.get('genreId'));
    const filtered = mockMovies.filter((m) =>
      m.genres.some((g) => g.id === genreId),
    );
    return createSuccessResponse(undefined, {
      contents: filtered,
    });
  }),

  // 인기 영화
  http.get('/movies/popular', () => {
    return createSuccessResponse(undefined, {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'movie'),
    });
  }),

  // 현재 상영작
  http.get('/movies/now-playing', () => {
    return createSuccessResponse(undefined, {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'movie'),
    });
  }),

  // 평점 높은 영화
  http.get('/movies/top-rated', () => {
    return createSuccessResponse(undefined, {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'movie'),
    });
  }),

  // 추천 영화 (id 기반)
  http.get('/movies/:id/recommends', () => {
    return createSuccessResponse(undefined, {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'movie'),
    });
  }),

  // 영화 상세
  http.get('/movies/:id', ({ params }) => {
    const movie = mockMovies.find((m) => m.id === Number(params.id));
    if (!movie) {
      return createErrorResponse(404, '영화를 찾을 수 없습니다.', 'NOT_FOUND');
    }
    return createSuccessResponse(undefined, movie);
  }),

  // 장르별 TV 조회
  http.get('/tvs/genre', ({ request }) => {
    const url = new URL(request.url);
    const genreId = Number(url.searchParams.get('genreId'));
    const filtered = mockTVs.filter((t) =>
      t.genres.some((g) => g.id === genreId),
    );
    return createSuccessResponse(undefined, {
      contents: filtered,
    });
  }),

  // 인기 TV
  http.get('/tvs/popular', () => {
    return createSuccessResponse(undefined, {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'tv'),
    });
  }),

  // 현재 방영 중인 TV
  http.get('/tvs/on-the-air', () => {
    return createSuccessResponse(undefined, {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'tv'),
    });
  }),

  // 평점 높은 TV
  http.get('/tvs/top-rated', () => {
    return createSuccessResponse(undefined, {
      mockContentsResponse,
      contents: mockContents.filter((c) => c.contentType === 'tv'),
    });
  }),

  // 추천 TV (id 기반)
  http.get('/tvs/:id/recommends', () => {
    return createSuccessResponse(undefined, {
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
    return createSuccessResponse(undefined, tv);
  }),
];
