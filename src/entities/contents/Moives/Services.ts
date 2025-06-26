import axios from "axios";
import { MoviesResponse, MovieDetail } from "./types";

const API_URL = 'localhost:PORT/api/movies'

export const fetchMoviesByGenre = async (genre_id: string, page = 1) => {
    const { data } = await axios.get<MoviesResponse>(`${API_URL}? genre_id=${genre_id}$page=${page}`);
    return data;
}

export const fetchPopularMovies = async (page = 1) => {
    const { data } = await axios.get<MoviesResponse>(`${API_URL}/popular? page=${page}`);
    return data;
}

export const fetchNowPlayingMovies = async (page = 1) => {
    const { data } = await axios.get<MoviesResponse>(`${API_URL}/now-playing?page=${page}`);
    return data;
}

export const fetchTopRatedMovies = async (page = 1) => {
    const { data } = await axios.get<MoviesResponse>(`${API_URL}/top-rated?page=${page}`);
    return data;
}

export const fetchRecommends = async (id: string | number) => {
    const {data} = await axios.get<MoviesResponse>(`${API_URL}/${id}/recommends`);
    return data;
}

export const fetchMoviesDatail = async (id: number) => {
    const { data } = await axios.get<MovieDetail>(`${API_URL}/${id}`);
    return data;
}