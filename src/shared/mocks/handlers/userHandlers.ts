import { LocalUser, OAuthUser, ProfileUpdateType } from 'entities/user/model';
import { http } from 'msw';
import { createErrorResponse, createSuccessResponse } from '../utils/response';

const localUser: LocalUser = {
  email: 'stepup@mail.com',
  nickname: '쌈뽕한키아누리브스',
  contact: '01012345678',
  image: 'https://image.tmdb.org/t/p/original/8RZLOyYGsoRe9p44q3xin9QkMHv.jpg',
  provider: 'local',
};

const _googleUser: OAuthUser = {
  email: 'stepup@mail.com',
  nickname: '구글키아누리브스',
  image: 'https://image.tmdb.org/t/p/original/8RZLOyYGsoRe9p44q3xin9QkMHv.jpg',
  provider: 'google',
};

export const userHandlers = [
  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
    ({ request }) => {
      const url = new URL(request.url);
      const errorType = url.searchParams.get('mockError');

      // 유저 없음 예외
      if (errorType === 'not-found') {
        return createErrorResponse(
          404,
          '해당 이메일로 가입된 유저가 없습니다.',
          'USER_NOT_FOUND',
        );
      }

      // 성공 응답
      return createSuccessResponse(undefined, localUser);
    },
  ),

  http.patch(
    `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
    async ({ request }) => {
      const body = (await request.json()) as ProfileUpdateType;
      const { nickname, contact, image } = body;

      // 중복 닉네임 시뮬레이션
      if (nickname === '중복닉네임') {
        return createErrorResponse(
          409,
          '이미 존재하는 닉네임입니다.',
          'DUPLICATE_NICKNAME',
        );
      }

      // 성공 응답
      return createSuccessResponse('회원 프로필 수정 성공');
    },
  ),
];
