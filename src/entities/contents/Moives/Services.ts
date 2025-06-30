import { MoviesResponse, MovieDetail } from "./types";
import { httpClient } from "src/shared/api/http";

const API_URL = '/movies'

export const fetchMoviesByGenre = async (genre_id: string, page = 1) => {
    const { response } = await httpClient.get<MoviesResponse>(`${API_URL}?genre_id=${genre_id}&page=${page}`);
    return response.data;
}

export const fetchPopularMovies = async (page = 1) => {
    const { response } = await httpClient.get<MoviesResponse>(`${API_URL}/popular?page=${page}`);
    return response.data;
}

export const fetchNowPlayingMovies = async (page = 1) => {
    const { response } = await httpClient.get<MoviesResponse>(`${API_URL}/now-playing?page=${page}`);
    return response.data;
}

export const fetchTopRatedMovies = async (page = 1) => {
    const { response } = await httpClient.get<MoviesResponse>(`${API_URL}/top-rated?page=${page}`);
    return response.data;
}

export const fetchRecommends = async (id: string | number) => {
    const { response } = await httpClient.get<MoviesResponse>(`${API_URL}/${id}/recommends`);
    return response.data;
}

export const fetchMoviesDetail = async (id: number) => {
    const { response } = await httpClient.get<MovieDetail>(`${API_URL}/${id}`);
    return response.data;
}