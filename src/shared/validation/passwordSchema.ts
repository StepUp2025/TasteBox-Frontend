import { ZodIssueCode, z } from 'zod';

export const passwordSchema = z
  .string()
  .trim()
  .nonempty('비밀번호를 입력해주세요.')
  .superRefine((val, ctx) => {
    const isInvalidLength = val.length < 6 || val.length > 20;
    const hasWhitespace = /\s/.test(val);
    const isValidChars =
      /^[A-Za-z\d!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]+$/.test(val);

    if (isInvalidLength || hasWhitespace || !isValidChars) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message:
          '비밀번호는 6~20자 사이여야 하며, 공백 없이 영문, 숫자, 특수문자만 사용할 수 있어요.',
      });
    }
  });
