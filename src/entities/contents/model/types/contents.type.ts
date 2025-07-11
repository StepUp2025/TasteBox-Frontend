import { Genre } from 'entities/genre';

export type ContentType = 'movie' | 'tv';
export interface Contents {
  id: number;
  posterPath: string | null;
  title: string;
  contentType: ContentType;
}

export interface ParameterTypes {
  genreId: number;
  page: number;
  limit: number;
}

export interface ContentsResponse {
  contents: Contents[];
  page: number;
  limit: number;
  totalPages: number;
}

export interface ContentsDetail extends Contents {
  originalLanguage: string;
  voteAverage: number;
  voteCount: number;
  backdropPath: string | null;
  overview: string;
  status: string;
  genres: Genre[];
}
