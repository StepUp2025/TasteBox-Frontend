import { passwordSchema } from 'shared/validation/passwordSchema';
import { ZodIssueCode, z } from 'zod';

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty('현재 비밀번호를 입력해주세요.'),
    newPassword: passwordSchema,
    newPasswordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      ctx.addIssue({
        path: ['newPasswordConfirm'],
        code: ZodIssueCode.custom,
        message: '새 비밀번호가 일치하지 않습니다.',
      });
    }
  });

export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;
