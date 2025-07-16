import { ZodIssueCode, z } from 'zod';

export const thumbnailSchema = z
  .custom<FileList | undefined>((val) => val == null || val instanceof FileList)
  .superRefine((val, ctx) => {
    if (val == null) {
      return;
    }

    if (!(val instanceof FileList)) {
      ctx.addIssue({
        path: ['thumbnail'],
        code: ZodIssueCode.custom,
        message: '파일 형식이 잘못됐어요.',
      });
      return;
    }

    if (val.length === 0) {
      ctx.addIssue({
        path: ['thumbnail'],
        code: ZodIssueCode.custom,
        message: '이미지를 하나 이상 선택해주세요.',
      });
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const oversizedFiles = Array.from(val).filter(
      (f) => f.size > 5 * 1024 * 1024,
    );
    const invalidTypeFiles = Array.from(val).filter(
      (f) => !validTypes.includes(f.type),
    );

    if (invalidTypeFiles.length > 0) {
      ctx.addIssue({
        path: ['thumbnail'],
        code: ZodIssueCode.custom,
        message: '이미지 파일만 업로드할 수 있어요 (jpg, png, webp)',
      });
    }

    if (oversizedFiles.length > 0) {
      ctx.addIssue({
        path: ['thumbnail'],
        code: ZodIssueCode.custom,
        message: '각 파일은 최대 5MB까지 업로드할 수 있어요.',
      });
    }
  });
