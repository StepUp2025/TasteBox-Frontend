import { ContentsDetail } from '../types/contents.type';

export interface TVs extends ContentsDetail {
  firstAirDate: string;
  lastAirDate: string;
  numberOfSeasons: number;
  seasons: { id: number; title: string; posterPath: string }[];
}
