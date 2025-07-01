import { Genre } from 'entities/genre';

export interface Contents {
  id: number;
  poster_path: string | null;
  title: string;
  contentType: 'movie' | 'tv';
}

export interface ParameterTypes {
  genreId: number;
  page: number;
}

export interface ContentsResponse {
  contents: Contents[];
  page: number;
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
