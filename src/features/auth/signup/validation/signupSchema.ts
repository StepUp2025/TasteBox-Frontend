import { z } from 'zod';

export const signupSchema = z
  .object({
    nickname: z.string().trim(),
    email: z.string().trim(),
    password: z.string(),
    phone: z.string().trim(),
  })
  .superRefine((values, ctx) => {
    const nickname = values.nickname;
    if (!nickname) {
      ctx.addIssue({
        path: ['nickname'],
        code: z.ZodIssueCode.custom,
        message: '닉네임을 입력해주세요.',
      });
    }
    if (nickname.length < 2 || nickname.length > 10) {
      ctx.addIssue({
        path: ['nickname'],
        code: z.ZodIssueCode.custom,
        message: '닉네임은 2~10자 사이로 입력해주세요.',
      });
    }

    const email = values.email;
    if (!email) {
      ctx.addIssue({
        path: ['email'],
        code: z.ZodIssueCode.custom,
        message: '이메일을 입력해주세요.',
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      ctx.addIssue({
        path: ['email'],
        code: z.ZodIssueCode.custom,
        message: '유효한 이메일 주소를 입력해주세요.',
      });
    }

    const pw = values.password;
    if (!pw.trim()) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        message: '비밀번호를 입력해주세요.',
      });
    }
    const isInvalidLength = pw.length < 6 || pw.length > 20;
    const hasWhitespace = /\s/.test(pw);
    const isValidChars =
      /^[A-Za-z\d!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]+$/.test(pw);
    if (pw.trim() && (isInvalidLength || hasWhitespace || !isValidChars)) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        message:
          '비밀번호는 6~20자 사이여야 하며, 공백 없이 영문, 숫자, 특수문자만 사용할 수 있어요.',
      });
    }

    const phone = values.phone;
    const phoneRegex = /^01[016789]\d{7,8}$/;

    if (!phone) {
      ctx.addIssue({
        path: ['phone'],
        code: z.ZodIssueCode.custom,
        message: '휴대폰 번호를 입력해주세요.',
      });
    }

    if (phone && !phoneRegex.test(phone)) {
      ctx.addIssue({
        path: ['phone'],
        code: z.ZodIssueCode.custom,
        message: '휴대폰 번호는 숫자만 9~11자리로 입력해주세요.',
      });
    }
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
