import { ProfileUpdateType } from "entities/user/model";
import { HttpResponse, http } from "msw";

const getUserProfile = http.get(
  `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
  ({ request }) => {
    const url = new URL(request.url);
    const errorType = url.searchParams.get("mockError");

    //  유저 없음 예외
    if (errorType === "not-found") {
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

    //  성공 응답
    return HttpResponse.json(
      {
        email: "stepup@mail.com",
        nickname: "쌈뽕한닉네임",
        contact: "010-1234-5678",
        image: "https://example.com/image.jpg",
        provider: "local",
      },
      { status: 200 },
    );
  },
);

const updateUserProfile = http.patch(
  `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
  async ({ request }) => {
    const body = (await request.json()) as ProfileUpdateType;
    const { nickname, contact, image } = body;

    //  중복 닉네임 시뮬레이션
    if (nickname === "중복닉네임") {
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

    //  성공 응답
    return HttpResponse.json(
      {
        message: "회원 프로필이 성공적으로 수정되었습니다.",
        nickname,
        contact,
        image,
      },
      { status: 200 },
    );
  },
);

//  마지막에 배열로 export
export const userHandlers = [getUserProfile, updateUserProfile];
