import { contactSchema } from 'shared/validation/contactSchema';
import { emailSchema } from 'shared/validation/emailSchema';
import { nicknameSchema } from 'shared/validation/nicknameSchema';
import { passwordSchema } from 'shared/validation/passwordSchema';
import { ZodIssueCode, z } from 'zod';

export const signupSchema = z
  .object({
    nickname: nicknameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string(),
    contact: contactSchema,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        path: ['PasswordConfirm'],
        code: ZodIssueCode.custom,
        message: '새 비밀번호가 일치하지 않습니다.',
      });
    }
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
