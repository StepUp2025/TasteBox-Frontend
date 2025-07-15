import { descriptionSchema } from 'shared/validation/descriptionSchema';
import { thumbnailSchema } from 'shared/validation/thumbnailSchema';
import { titleSchema } from 'shared/validation/titleSchema';
import { z } from 'zod';

export const createCollectionFormSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  thumbnail: thumbnailSchema,
});

export const editCollectionFormSchema = z.object({
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  thumbnail: thumbnailSchema.optional(),
});

export type CreateCollectionFormValues = z.infer<
  typeof createCollectionFormSchema
>;
export type EditCollectionFormValues = z.infer<typeof editCollectionFormSchema>;
