import { ZodIssueCode, z } from 'zod';

export const nicknameSchema = z
  .string()
  .trim()
  .nonempty('닉네임을 입력해주세요.')
  .superRefine((val, ctx) => {
    if (val.length < 2 || val.length > 10) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: '닉네임은 2~10자 사이로 입력해주세요.',
      });
    }
  });
