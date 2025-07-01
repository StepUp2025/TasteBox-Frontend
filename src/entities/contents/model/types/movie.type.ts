import { ContentDetail, Contents } from "./Contents.type";

export interface MoviesResponse {
    movies: Contents[];
    page?: number;
    totalPages?: number;
}

  export interface MovieDetail extends ContentDetail {
    originalLanguage: string;
    runtime: number;
    releaseDate: string;
    productionCompanies: { id: number; name: string }[];
  }