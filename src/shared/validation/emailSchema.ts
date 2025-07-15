import { ZodIssueCode, z } from 'zod';

const allowedDomains = [
  'gmail.com',
  'naver.com',
  'daum.net',
  'kakao.com',
  'hanmail.net',
  'hotmail.com',
  'yahoo.com',
  'outlook.com',
  'icloud.com',
  'nate.com',
  'mail.com',
];

export const emailSchema = z
  .string()
  .trim()
  .nonempty('이메일을 입력해주세요.')
  .superRefine((val, ctx) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = val.split('@')[1]?.toLowerCase();

    if (!emailRegex.test(val) || !domain || !allowedDomains.includes(domain)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: '유효한 이메일 주소를 입력해주세요.(example@mail.com)',
      });
    }
  });
