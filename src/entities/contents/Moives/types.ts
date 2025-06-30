import { Genre } from "../types/genre.type";

export interface Movie {
    id: number;
    poster_path: string | null;
    title: string;
    contentType?: 'movie' | 'tvSeries';

}

export interface MoviesResponse {
    movies: Movie[];
    page?: number;
    totalPages?: number;
}

export interface MovieDetail extends Movie {
    backdrop_path: string | null;
    overview: string;
    adult: boolean;
    original_language: string;
    genres: Genre[];
    status: string;
    runtime: number;
    popularity: number;
    release_date: string;
    vote_average: number;
    vote_count: number;
    production_companies: { id: number; name: string }[];
  }