import { contactSchema } from 'shared/validation/contactSchema';
import { nicknameSchema } from 'shared/validation/nicknameSchema';
import { z } from 'zod';

export const userProfileSchema = z.object({
  nickname: nicknameSchema,
  contact: contactSchema.optional(),
});

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
