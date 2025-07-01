import { Genre } from "./genre.type";

export interface Contents {
    id: number;
    poster_path: string | null;
    title: string;
    contentType?: 'movie' | 'tvs';
}

export interface ContentsTypes {
    genreId: number; 
    page?: number;
}

export interface ContentDetail{
    originalLanguage: string;
    popularity: number;
    voteAverage: number;
    voteCount: number;
    backdropPath: string | null; 
    overview: string;
    status: string;
        adult: boolean;
        genres: Genre[];
}