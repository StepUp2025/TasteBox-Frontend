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

export const validateEmailField = (val: string, ctx: z.RefinementCtx) => {
  const [local, domain] = val.split('@');

  if (!local || !domain) {
    ctx.addIssue({
      path: ['email'],
      code: ZodIssueCode.custom,
      message: '이메일 형식이 잘못되었습니다.',
    });
    return;
  }

  if (local.startsWith('.')) {
    ctx.addIssue({
      path: ['email'],
      code: ZodIssueCode.custom,
      message: '이메일 아이디는 점(.)으로 시작할 수 없습니다.',
    });
  }

  if (local.includes('..')) {
    ctx.addIssue({
      path: ['email'],
      code: ZodIssueCode.custom,
      message: '이메일 아이디에 연속된 점(..)은 사용할 수 없습니다.',
    });
  }

  if (!/[A-Za-z0-9_+-]$/.test(local)) {
    ctx.addIssue({
      path: ['email'],
      code: ZodIssueCode.custom,
      message: '이메일 아이디는 허용된 문자로 끝나야 합니다 (dot 불가).',
    });
  }

  const emailRegex =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
  if (!emailRegex.test(val)) {
    ctx.addIssue({
      path: ['email'],
      code: ZodIssueCode.custom,
      message: '이메일 형식이 올바르지 않습니다.',
    });
  }

  if (!allowedDomains.includes(domain.toLowerCase())) {
    ctx.addIssue({
      path: ['email'],
      code: ZodIssueCode.custom,
      message: '허용된 이메일 도메인(gmail.com, naver.com 등)을 입력해주세요.',
    });
  }

  const tld = domain.split('.').pop();
  if (!tld || tld.length < 2) {
    ctx.addIssue({
      path: ['email'],
      code: ZodIssueCode.custom,
      message: '최상위 도메인(TLD)은 최소 2자 이상이어야 합니다.',
    });
  }
};
