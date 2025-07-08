import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().trim(),
    password: z.string(),
  })
  .superRefine((values, ctx) => {
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
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
