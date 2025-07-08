import { emailSchema } from 'shared/validation/emailSchema';
import { nicknameSchema } from 'shared/validation/nicknameSchema';
import { passwordSchema } from 'shared/validation/passwordSchema';
import { phoneSchema } from 'shared/validation/phoneSchema';
import { z } from 'zod';

export const signupSchema = z.object({
  nickname: nicknameSchema,
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
});

export type SignupFormValues = z.infer<typeof signupSchema>;
