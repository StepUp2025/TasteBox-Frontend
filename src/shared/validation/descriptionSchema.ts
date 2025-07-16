import { ZodIssueCode, z } from 'zod';

export const descriptionSchema = z
  .string()
  .trim()
  .nonempty('설명을 입력해주세요.')
  .superRefine((val, ctx) => {
    if (val.length > 300) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: '설명은 300자 이하로 입력해주세요.',
      });
    }
  });
