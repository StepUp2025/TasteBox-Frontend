import { DEFAULT_IMAGE_SIZE, ImageSize } from 'shared/constants/image';

export const getImageUrl = (
  path: string | null,
  size: ImageSize = DEFAULT_IMAGE_SIZE,
): string | undefined => {
  if (!path) return undefined;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
