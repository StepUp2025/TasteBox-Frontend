import { UserPreferenceUpdateType } from 'entities/user/model';
import { http } from 'msw';
import { createErrorResponse, createSuccessResponse } from '../utils/response';

const userPreference = {
  movies: {
    genres: [
      {
        id: 1,
        name: '액션',
        emoji: '🔥',
      },
      {
        id: 2,
        name: '모험',
        emoji: '🗺️',
      },
      {
        id: 3,
        name: '액션',
        emoji: '🔥',
      },
      {
        id: 4,
        name: '모험',
        emoji: '🗺️',
      },
      {
        id: 5,
        name: '액션',
        emoji: '🔥',
      },
      {
        id: 6,
        name: '모험',
        emoji: '🗺️',
      },
      {
        id: 7,
        name: '액션',
        emoji: '🔥',
      },
      {
        id: 8,
        name: '모험',
        emoji: '🗺️',
      },
    ],
    count: 8,
  },
  tvs: {
    genres: [
      {
        id: 20,
        name: '드라마',
        emoji: '🎭',
      },
      {
        id: 21,
        name: '드라마',
        emoji: '🎭',
      },
      {
        id: 22,
        name: '드라마',
        emoji: '🎭',
      },
      {
        id: 23,
        name: '드라마',
        emoji: '🎭',
      },
      {
        id: 24,
        name: '드라마',
        emoji: '🎭',
      },
      {
        id: 25,
        name: '드라마',
        emoji: '🎭',
      },
    ],
    count: 6,
  },
};

const _emptyPreference = {
  movies: {
    genres: [
      {
        id: 1,
        name: '액션',
        emoji: '🔥',
      },
      {
        id: 2,
        name: '모험',
        emoji: '🗺️',
      },
      {
        id: 1,
        name: '액션',
        emoji: '🔥',
      },
      {
        id: 2,
        name: '모험',
        emoji: '🗺️',
      },
      {
        id: 1,
        name: '액션',
        emoji: '🔥',
      },
      {
        id: 2,
        name: '모험',
        emoji: '🗺️',
      },
      {
        id: 1,
        name: '액션',
        emoji: '🔥',
      },
      {
        id: 2,
        name: '모험',
        emoji: '🗺️',
      },
    ],
    count: 8,
  },
  tvs: {
    genres: [],
    count: 0,
  },
};

export const preferenceHandlers = [
  http.put(
    `${import.meta.env.VITE_API_BASE_URL}/users/preferences`,
    async ({ request }) => {
      const body = (await request.json()) as UserPreferenceUpdateType;

      const isMovieEmpty = body.movie.genreIds.length === 0;
      const isTVEmpty = body.tv.genreIds.length === 0;

      if (isMovieEmpty && isTVEmpty) {
        return createErrorResponse(
          404,
          '장르가 발견되지 않았습니다.',
          'GENRE_NOT_FOUND',
        );
      }

      return createSuccessResponse('선호 장르 저장 성공');
    },
  ),

  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/users/preferences`,
    async () => {
      return createSuccessResponse(undefined, userPreference);
    },
  ),

  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/users/preferences/movies`,
    async () => {
      return createSuccessResponse(undefined, userPreference.movies);
    },
  ),

  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/users/preferences/tvs`,
    async () => {
      return createSuccessResponse(undefined, userPreference.tvs);
    },
  ),
];
