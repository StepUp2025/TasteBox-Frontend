import { LocalUser } from 'entities/user/model';
import { HttpResponse, http } from 'msw';
import { createErrorResponse, createSuccessResponse } from '../utils/response';

const localUser: LocalUser = {
  email: 'stepup@mail.com',
  nickname: '쌈뽕한키아누리브스',
  contact: '01012345678',
  image: 'https://image.tmdb.org/t/p/original/8RZLOyYGsoRe9p44q3xin9QkMHv.jpg',
  provider: 'local',
};

// const _googleUser: OAuthUser = {
//   email: 'stepup@mail.com',
//   nickname: '구글키아누리브스',
//   contact: '01012345678',
//   image: 'https://image.tmdb.org/t/p/original/8RZLOyYGsoRe9p44q3xin9QkMHv.jpg',
//   provider: 'google',
// };

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
      const formData = await request.formData(); // ✅ multipart/form-data 파싱
      const nickname = formData.get('nickname') as string | null;
      const contact = formData.get('contact') as string | null;
      const image = formData.get('image') as File | null;

      console.log('프로필 수정 요청:', { nickname, contact, image });

      if (nickname === '중복닉네임') {
        return new HttpResponse(
          JSON.stringify({
            message: '이미 존재하는 닉네임입니다.',
            code: 'DUPLICATE_NICKNAME',
          }),
          { status: 409, headers: { 'Content-Type': 'application/json' } },
        );
      }

      return new HttpResponse(
        JSON.stringify({ message: '회원 프로필 수정 성공' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    },
  ),
];
