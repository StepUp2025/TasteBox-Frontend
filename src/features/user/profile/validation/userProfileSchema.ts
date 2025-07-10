import { nicknameSchema } from 'shared/validation/nicknameSchema';
import { phoneSchema } from 'shared/validation/phoneSchema';
import { z } from 'zod';

export const userProfileSchema = z.object({
  nickname: nicknameSchema,
  phone: phoneSchema.optional(),
});

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
