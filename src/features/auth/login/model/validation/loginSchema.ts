import { emailSchema } from 'shared/validation/emailSchema';
import { passwordSchema } from 'shared/validation/passwordSchema';
import { z } from 'zod';

export const loginSchema = z.object({
  email: emailSchema,

  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
