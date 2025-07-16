import { ZodIssueCode, z } from 'zod';

export const titleSchema = z
  .string()
  .trim()
  .nonempty('제목을 입력해주세요.')
  .superRefine((val, ctx) => {
    if (val.length > 30) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: '제목은 30자 이하로 입력해주세요.',
      });
    }
  });
