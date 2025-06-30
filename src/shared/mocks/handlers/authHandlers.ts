import {
  LoginType,
  ResetPasswordType,
  SignupType,
} from "entities/auth/model/types/auth.type";
import { HttpResponse, http } from "msw";

export const signup = http.post(
  `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
  async ({ request }) => {
    const body = (await request.json()) as SignupType;

    // 중복 닉네임 테스트
    if (body.nickname === "중복닉네임") {
      return HttpResponse.json(
        {
          statusCode: 409,
          message: "이미 존재하는 닉네임입니다.",
          error: "DUPLICATE_NICKNAME",
          timestamp: new Date().toISOString(),
        },
        { status: 409 },
      );
    }
    // 중복 이메일
    if (body.email === "already@mail.com") {
      return HttpResponse.json(
        {
          statusCode: 409,
          message: "이미 가입된 계정입니다 (undefined)",
          error: "ALREADY_REGISTERED_ACCOUNT",
          timestamp: new Date().toISOString(),
        },
        { status: 409 },
      );
    }

    return HttpResponse.json(
      {
        message: "회원가입 성공",
      },
      { status: 201 },
    );
  },
);

export const login = http.post(
  `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
  async ({ request }) => {
    const body = (await request.json()) as LoginType;

    if (body.email === "stepup@mail.com" && body.password === "1234") {
      const accessToken = "mock-access-token";
      const refreshToken = "mock-refresh-token";

      return HttpResponse.json(
        JSON.stringify({
          accessToken,
        }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `refreshToken=${refreshToken} ; Path=/; HttpOnly; Secure; SameSite=Strict`,
          },
        },
      );
    }

    // 로그인 실패 응답
    return HttpResponse.json(
      {
        statusCode: 401,
        message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        error: "INVALID_CREDENTIALS",
        timestamp: new Date().toISOString(),
      },
      { status: 401 },
    );
  },
);

export const logout = http.post(
  `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
  async () => {
    return HttpResponse.json(
      {
        message: "로그아웃 성공",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      },
    );
  },
);

const refreshToken = http.post(
  `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
  async () => {
    return HttpResponse.json(
      {
        accessToken: "mock-access-token",
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `refreshToken=mock-refresh-token; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      },
    );
  },
);

const resetPassword = http.put(
  `${import.meta.env.VITE_BACKEND_URL}/auth/password`,
  async ({ request }) => {
    const body = (await request.json()) as ResetPasswordType;
    const { currentPassword, newPassword, newPasswordConfirm } = body;

    //  1. OAuth 계정일 경우
    if (currentPassword === "oauth-account") {
      return HttpResponse.json(
        {
          statusCode: 401,
          message: "OAuth 계정은 비밀번호 변경이 불가능합니다.",
          error: "OAUTH_ACCOUNT_PASSWORD_CHANGE",
          timestamp: new Date().toISOString(),
        },
        { status: 401 },
      );
    }

    //  2. 유저가 없는 경우
    if (currentPassword === "not-found") {
      return HttpResponse.json(
        {
          statusCode: 404,
          message: "해당 이메일로 가입된 유저가 없습니다.",
          error: "USER_NOT_FOUND",
          timestamp: new Date().toISOString(),
        },
        { status: 404 },
      );
    }

    //  3. 새 비밀번호 확인 불일치
    if (newPassword !== newPasswordConfirm) {
      return HttpResponse.json(
        {
          statusCode: 400,
          message: "새 비밀번호가 서로 일치하지 않습니다",
          error: "PASSWORD_MISMATCH",
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      );
    }

    //  4. 성공
    return HttpResponse.json(
      {
        message: "비밀번호가 성공적으로 변경되었습니다.",
      },
      { status: 200 },
    );
  },
);

export const loginGoogle = http.get(
  `${import.meta.env.VITE_BACKEND_URL}/auth/google/login`,
  ({ request }) => {
    const url = new URL(request.url);
    const errorType = url.searchParams.get("mockError"); // 개발자도구 콘솔에서 조작 해야함!!

    // 예외 케이스 분기

    // 1. 이미 가입된 계정
    if (errorType === "already-registered") {
      return HttpResponse.json(
        {
          statusCode: 409,
          message: "이미 가입된 계정입니다 (undefined)",
          error: "ALREADY_REGISTERED_ACCOUNT",
          timestamp: new Date().toISOString(),
        },
        { status: 409 },
      );
    }

    // 2. 고유 닉네임 생성 실패
    if (errorType === "nickname-fail") {
      return HttpResponse.json(
        {
          statusCode: 500,
          message: "고유한 닉네임을 생성하지 못했습니다",
          error: "UNIQUE_NICKNAME_GENERATION_FAILED",
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      );
    }

    // 3. 정상적으로 Google 로그인 페이지로 리다이렉트
    return HttpResponse.redirect(
      "https://accounts.google.com/o/oauth2/v2/auth",
      302,
    );
  },
);

export const googleCallback = http.get(
  `${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`,
  () => {
    const accessToken = "mock-access-token";
    const refreshToken = "mock-refresh-token";

    // 직접 HttpResponse 생성해서 리다이렉트 + 헤더 + body 모두 포함
    return new HttpResponse(JSON.stringify({ accessToken }), {
      status: 302,
      headers: {
        "Content-Type": "application/json",
        Location: "http://localhost:5173/oauth/success",
        "Set-Cookie": `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  },
);

export const loginKakao = http.get(
  `${import.meta.env.VITE_BACKEND_URL}/auth/kakao/login`,
  ({ request }) => {
    const url = new URL(request.url);
    const errorType = url.searchParams.get("mockError"); // 개발자도구 콘솔에서 조작해야 함!!

    // 예외 케이스 분기

    // 1. 이미 가입된 계정
    if (errorType === "already-registered") {
      return HttpResponse.json(
        {
          statusCode: 409,
          message: "이미 가입된 계정입니다 (undefined)",
          error: "ALREADY_REGISTERED_ACCOUNT",
          timestamp: new Date().toISOString(),
        },
        { status: 409 },
      );
    }

    // 2. 고유 닉네임 생성 실패
    if (errorType === "nickname-fail") {
      return HttpResponse.json(
        {
          statusCode: 500,
          message: "고유한 닉네임을 생성하지 못했습니다",
          error: "UNIQUE_NICKNAME_GENERATION_FAILED",
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      );
    }

    // 3. 정상적으로 Kakao 로그인 페이지로 리다이렉트
    return HttpResponse.redirect(
      "https://kauth.kakao.com/oauth/authorize",
      302,
    );
  },
);

export const kakaoCallback = http.get(
  `${import.meta.env.VITE_BACKEND_URL}/auth/kakao/callback`,
  () => {
    const accessToken = "mock-access-token";
    const refreshToken = "mock-refresh-token";

    return new HttpResponse(JSON.stringify({ accessToken }), {
      status: 302,
      headers: {
        "Content-Type": "application/json",
        Location: "http://localhost:5173/oauth/success",
        "Set-Cookie": `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  },
);

export const authHandlers = [
  signup,
  login,
  logout,
  refreshToken,
  resetPassword,
  loginGoogle,
  googleCallback,
  loginKakao,
  kakaoCallback,
];
