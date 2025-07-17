import {
  Contents,
  ContentsResponse,
} from 'entities/contents/model/types/contents.type';
import { Movie } from 'entities/contents/model/types/movie.type';
import { TVs } from 'entities/contents/model/types/tvs.type';
import { Genre } from 'entities/genre/types/genre.type';
import { http } from 'msw';
import mockContentsListJson from 'shared/mocks/data/mockContentsList.json';
import { paginate } from '../utils/pagination';
import { createErrorResponse, createSuccessResponse } from '../utils/response';

const mockContentsList: Contents[] = mockContentsListJson as Contents[]; //타입 명시

export const mockGenres: Genre[] = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Drama' },
];

export const mockContents: Contents[] = [
  {
    id: 1,
    posterPath: '/zTgjeblxSLSvomt6F6UYtpiD4n7.jpg',
    title: 'Inception',
    contentType: 'movie',
  },
  {
    id: 2,
    posterPath: '/ygr4hE8Qpagv8sxZbMw1mtYkcQE.jpg',
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
    posterPath: '/evoEi8SBSvIIEveM3V6nCJ6vKj8.jpg',
    title: 'Interstellar',
    contentType: 'movie',
  },
  {
    id: 5,
    posterPath: '/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
    title: 'Breaking Bad',
    contentType: 'tv',
  },
  {
    id: 6,
    posterPath: null,
    title: 'Breaking Bad',
    contentType: 'tv',
  },
  {
    id: 7,
    posterPath: '/yACIAqAkSLkX4coHafpyLWAtQjw.jpg',
    title: 'Squid Game',
    contentType: 'tv',
  },
  {
    id: 8,
    posterPath: '/yz4r477D8lljEF7xorrv3zvQxls.jpg',
    title: 'Stranger Things',
    contentType: 'tv',
  },
];

export const mockContentsResponse: ContentsResponse = {
  contents: mockContents,
  page: 1,
  totalPages: 5,
  contentType: 'movie', // 기본값 설정
};

export const mockMovies: Movie[] = [
  {
    id: 301,
    posterPath: '/fxBxoXFAYKWde6lKzXxSusn18Av.jpg',
    title: 'The Matrix',
    contentType: 'movie',
    originalLanguage: 'en',
    voteAverage: 8.7,
    voteCount: 1700,
    backdropPath: null,
    overview: '가상현실과 혁명을 다룬 SF 액션 영화.',
    status: 'Released',
    genres: [{ id: 1, name: 'Action' }],
    runtime: 136,
    releaseDate: '1999-03-31',
  },
  {
    id: 302,
    posterPath: '/mSi0gskYpmf1FbXngM37s2HppXh.jpg',
    title: '기생충',
    contentType: 'movie',
    originalLanguage: 'ko',
    voteAverage: 8.6,
    voteCount: 950,
    backdropPath: null,
    overview: '빈부격차를 그린 한국 드라마 영화.',
    status: 'Released',
    genres: [{ id: 2, name: 'Drama' }],
    runtime: 132,
    releaseDate: '2019-05-30',
  },
  {
    id: 303,
    posterPath: '/z7ilT5rNN9kDo8JZmgyhM6ej2xv.jpg',
    title: 'Avengers: Endgame',
    contentType: 'movie',
    originalLanguage: 'en',
    voteAverage: 8.4,
    voteCount: 2200,
    backdropPath: null,
    overview: '마블 히어로들의 마지막 전투.',
    status: 'Released',
    genres: [{ id: 1, name: 'Action' }],
    runtime: 181,
    releaseDate: '2019-04-26',
  },
  {
    id: 304,
    posterPath: '/iraQz6gdAe8JL45QcBifM1UhQ38.jpg',
    title: 'Forrest Gump',
    contentType: 'movie',
    originalLanguage: 'en',
    voteAverage: 8.8,
    voteCount: 1600,
    backdropPath: null,
    overview: '한 남자의 인생과 미국 현대사를 그린 감동 드라마.',
    status: 'Released',
    genres: [{ id: 2, name: 'Drama' }],
    runtime: 142,
    releaseDate: '1994-07-06',
  },
  {
    id: 305,
    posterPath: null,
    title: 'Inception',
    contentType: 'movie',
    originalLanguage: 'en',
    voteAverage: 8.3,
    voteCount: 2100,
    backdropPath: null,
    overview: '꿈속의 꿈을 다루는 SF 액션 스릴러.',
    status: 'Released',
    genres: [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Drama' },
    ],
    runtime: 148,
    releaseDate: '2010-07-16',
  },
];

export const mockTVs: TVs[] = [
  {
    id: 401,
    posterPath: '/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
    title: 'Breaking Bad',
    contentType: 'tv',
    originalLanguage: 'en',
    voteAverage: 9.5,
    voteCount: 1800,
    backdropPath: null,
    overview: '마약 제조에 뛰어든 화학 교사의 충격적인 이야기.',
    status: 'Ended',
    genres: [{ id: 2, name: 'Drama' }],
    firstAirDate: '2008-01-20',
    lastAirDate: '2013-09-29',
    numberOfSeasons: 5,
    seasons: [
      {
        id: 1,
        title: 'Season 1',
        posterPath: '/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
      },
      {
        id: 2,
        title: 'Season 2',
        posterPath: '/breakingbad_s2.jpg',
      },
    ],
  },
  {
    id: 402,
    posterPath: '/yACIAqAkSLkX4coHafpyLWAtQjw.jpg',
    title: '오징어 게임',
    contentType: 'tv',
    originalLanguage: 'ko',
    voteAverage: 8.7,
    voteCount: 1200,
    backdropPath: null,
    overview: '생존 게임에 참가한 이들의 극한 경쟁 이야기.',
    status: 'Returning Series',
    genres: [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Drama' },
    ],
    firstAirDate: '2021-09-17',
    lastAirDate: '2021-09-17',
    numberOfSeasons: 1,
    seasons: [
      {
        id: 1,
        title: 'Season 1',
        posterPath: '/yACIAqAkSLkX4coHafpyLWAtQjw.jpg',
      },
    ],
  },
  {
    id: 403,
    posterPath: 'h/mpOQpOKdo2XJnTqRzo1lTmDNsc1.jpg',
    title: 'Stranger Things',
    contentType: 'tv',
    originalLanguage: 'en',
    voteAverage: 8.9,
    voteCount: 1500,
    backdropPath: null,
    overview: '초자연적 현상과 소년 소녀들의 모험을 그린 미스터리 시리즈.',
    status: 'Returning Series',
    genres: [{ id: 1, name: 'Action' }],
    firstAirDate: '2016-07-15',
    lastAirDate: '2022-07-01',
    numberOfSeasons: 4,
    seasons: [
      {
        id: 1,
        title: 'Season 1',
        posterPath: '/mpOQpOKdo2XJnTqRzo1lTmDNsc1.jpg',
      },
      {
        id: 2,
        title: 'Season 2',
        posterPath: '/strangerthings_s2.jpg',
      },
    ],
  },
  {
    id: 404,
    posterPath: '/1qbiyfmJe7tu4QpqCz5flW93mKj.jpg',
    title: '우리들의 블루스',
    contentType: 'tv',
    originalLanguage: 'ko',
    voteAverage: 8.2,
    voteCount: 400,
    backdropPath: null,
    overview: '제주도를 배경으로 한 다양한 인물들의 삶과 사랑 이야기.',
    status: 'Ended',
    genres: [{ id: 2, name: 'Drama' }],
    firstAirDate: '2022-04-09',
    lastAirDate: '2022-06-12',
    numberOfSeasons: 1,
    seasons: [
      {
        id: 1,
        title: 'Season 1',
        posterPath: '/1qbiyfmJe7tu4QpqCz5flW93mKj.jpg',
      },
    ],
  },
  {
    id: 405,
    posterPath: '/qZMEiTsNlCQV27hHQE27ZtlPWyv.jpg',
    title: '도깨비',
    contentType: 'tv',
    originalLanguage: 'ko',
    voteAverage: 8.6,
    voteCount: 800,
    backdropPath: null,
    overview: '불멸의 도깨비와 죽음의 신, 그리고 인간 소녀의 판타지 로맨스.',
    status: 'Ended',
    genres: [{ id: 2, name: 'Drama' }],
    firstAirDate: '2016-12-02',
    lastAirDate: '2017-01-21',
    numberOfSeasons: 1,
    seasons: [
      {
        id: 1,
        title: 'Season 1',
        posterPath: '/qZMEiTsNlCQV27hHQE27ZtlPWyv.jpg',
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
  http.get('/movies', ({ request }) => {
    const url = new URL(request.url);
    const genreIds = url.searchParams.getAll('genreId').map(Number);
    console.log('장르 ID:', genreIds);

    const pagination = paginate(mockContentsList, request);
    return createSuccessResponse(undefined, pagination);
  }),

  // 인기 영화
  http.get('/movies/popular', ({ request }) => {
    const pagination = paginate(mockContentsList, request);
    return createSuccessResponse(undefined, pagination);
  }),

  // 현재 상영작
  http.get('/movies/now-playing', ({ request }) => {
    const pagination = paginate(mockContentsList, request);
    return createSuccessResponse(undefined, pagination);
  }),

  // 평점 높은 영화
  http.get('/movies/top-rated', ({ request }) => {
    const pagination = paginate(mockContentsList, request);
    return createSuccessResponse(undefined, pagination);
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
  http.get('/tvs', ({ request }) => {
    const url = new URL(request.url);
    const genreIds = url.searchParams.getAll('genreId').map(Number);
    console.log('장르 ID:', genreIds);

    const pagination = paginate(mockContentsList, request);
    return createSuccessResponse(undefined, pagination);
  }),

  // 인기 TV
  http.get('/tvs/popular', ({ request }) => {
    const pagination = paginate(mockContentsList, request);
    return createSuccessResponse(undefined, pagination);
  }),

  // 현재 방영 중인 TV
  http.get('/tvs/on-the-air', ({ request }) => {
    const pagination = paginate(mockContentsList, request);
    return createSuccessResponse(undefined, pagination);
  }),

  // 평점 높은 TV
  http.get('/tvs/top-rated', ({ request }) => {
    const pagination = paginate(mockContentsList, request);
    return createSuccessResponse(undefined, pagination);
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
