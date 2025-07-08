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
    ],
    count: 2,
  },
  tvs: {
    genres: [
      {
        id: 20,
        name: '드라마',
        emoji: '🎭',
      },
    ],
    count: 1,
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
    `${import.meta.env.VITE_API_BASE_URL}/user/preferences`,
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
