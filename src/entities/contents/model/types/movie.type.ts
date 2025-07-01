import { ContentsDetail } from './contents.type';

export interface Movie extends ContentsDetail {
  runtime: number;
  releaseDate: string;
}
