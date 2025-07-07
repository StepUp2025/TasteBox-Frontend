import {
  LoginRequestType,
  ResetPasswordRequestType,
  SignupRequestType,
} from 'entities/auth/model/types/auth.type';
import { http } from 'msw';
import { createErrorResponse, createSuccessResponse } from '../utils/response';

const BASE = import.meta.env.VITE_API_BASE_URL;

export const authHandlers = [
  http.post(`${BASE}/auth/signup`, async ({ request }) => {
    const body = (await request.json()) as SignupRequestType;

    if (body.nickname === '중복닉네임') {
      return createErrorResponse(
        409,
        '이미 존재하는 닉네임입니다.',
        'DUPLICATE_NICKNAME',
      );
    }

    if (body.email === 'already@mail.com') {
      return createErrorResponse(
        409,
        '이미 가입된 계정입니다 (undefined)',
        'ALREADY_REGISTERED_ACCOUNT',
      );
    }

    return createSuccessResponse('회원가입 성공', undefined, 201);
  }),

  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as LoginRequestType;

    if (body.email === 'stepup@mail.com' && body.password === '1234') {
      const accessToken = 'mock-access-token';
      const refreshToken = 'mock-refresh-token';

      return new Response(JSON.stringify({ accessToken }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      });
    }

    return createErrorResponse(
      401,
      '이메일 또는 비밀번호가 일치하지 않습니다.',
      'INVALID_CREDENTIALS',
    );
  }),

  http.post(`${BASE}/auth/logout`, () => {
    return new Response(JSON.stringify({ message: '로그아웃 성공' }), {
      status: 200,
      headers: {
        'Set-Cookie': `refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  }),

  http.post(`${BASE}/auth/refresh`, () => {
    return new Response(JSON.stringify({ accessToken: 'mock-access-token' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `refreshToken=mock-refresh-token; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  }),

  http.put(`${BASE}/auth/password`, async ({ request }) => {
    const body = (await request.json()) as ResetPasswordRequestType;
    const { currentPassword, newPassword, newPasswordConfirm } = body;

    if (currentPassword === 'oauth-account') {
      return createErrorResponse(
        401,
        'OAuth 계정은 비밀번호 변경이 불가능합니다.',
        'OAUTH_ACCOUNT_PASSWORD_CHANGE',
      );
    }

    if (currentPassword === 'not-found') {
      return createErrorResponse(
        404,
        '해당 이메일로 가입된 유저가 없습니다.',
        'USER_NOT_FOUND',
      );
    }

    if (newPassword !== newPasswordConfirm) {
      return createErrorResponse(
        400,
        '새 비밀번호가 서로 일치하지 않습니다',
        'PASSWORD_MISMATCH',
      );
    }

    return createSuccessResponse('비밀번호가 성공적으로 변경되었습니다.');
  }),

  http.get(`${BASE}/auth/google/login`, ({ request }) => {
    const url = new URL(request.url);
    const errorType = url.searchParams.get('mockError');

    if (errorType === 'already-registered') {
      return createErrorResponse(
        409,
        '이미 가입된 계정입니다 (undefined)',
        'ALREADY_REGISTERED_ACCOUNT',
      );
    }

    if (errorType === 'nickname-fail') {
      return createErrorResponse(
        500,
        '고유한 닉네임을 생성하지 못했습니다',
        'UNIQUE_NICKNAME_GENERATION_FAILED',
      );
    }

    return Response.redirect(
      'https://accounts.google.com/o/oauth2/v2/auth',
      302,
    );
  }),

  http.get(`${BASE}/auth/google/callback`, () => {
    const accessToken = 'mock-access-token';
    const refreshToken = 'mock-refresh-token';

    return new Response(JSON.stringify({ accessToken }), {
      status: 302,
      headers: {
        'Content-Type': 'application/json',
        Location: 'http://localhost:5173/oauth/success',
        'Set-Cookie': `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  }),

  http.get(`${BASE}/auth/kakao/login`, ({ request }) => {
    const url = new URL(request.url);
    const errorType = url.searchParams.get('mockError');

    if (errorType === 'already-registered') {
      return createErrorResponse(
        409,
        '이미 가입된 계정입니다 (undefined)',
        'ALREADY_REGISTERED_ACCOUNT',
      );
    }

    if (errorType === 'nickname-fail') {
      return createErrorResponse(
        500,
        '고유한 닉네임을 생성하지 못했습니다',
        'UNIQUE_NICKNAME_GENERATION_FAILED',
      );
    }

    return Response.redirect('https://kauth.kakao.com/oauth/authorize', 302);
  }),

  http.get(`${BASE}/auth/kakao/callback`, () => {
    const accessToken = 'mock-access-token';
    const refreshToken = 'mock-refresh-token';

    return new Response(JSON.stringify({ accessToken }), {
      status: 302,
      headers: {
        'Content-Type': 'application/json',
        Location: 'http://localhost:5173/oauth/success',
        'Set-Cookie': `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  }),
];
