import { ZodIssueCode, z } from 'zod';

export const phoneSchema = z
  .string()
  .trim()
  .nonempty('휴대폰 번호를 입력해주세요.')
  .superRefine((val, ctx) => {
    const phoneRegex = /^01[016789]\d{7,8}$/;

    if (!phoneRegex.test(val)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: '휴대폰 번호는 숫자만 9~11자리로 입력해주세요.',
      });
    }
  });
