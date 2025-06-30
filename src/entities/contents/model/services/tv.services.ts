import { TVSeriesResponse, TVSeriesDetail } from "./types";
import { httpClient } from "src/shared/api/http";

const API_URL = '/tvs';


export const fetchTVSeriesByGenre = async (genre_id: string, page = 1) => {
    const response = await httpClient.get(`${API_URL}? genre_id=${genre_id}&page=${page}`);
    return response.data;
}

export const fetchPopularTVSeries = async (page = 1) => {
    const { response } = await httpClient.get<TVSeriesResponse>(`${API_URL}/popular? page=${page}`);
    return response.data;
}

export const fetchOnTheAirTVSeries = async (page = 1) => {
    const { response } = await httpClient.get<TVSeriesResponse>(`${API_URL}/on-the-air?page=${page}`);
    return response.data;
}

export const fetchTopRatedTVSeries = async (page = 1) => {
    const { response } = await httpClient.get<TVSeriesResponse>(`${API_URL}/top-rated?page=${page}`);
    return response.data;
}

export const fetchTVSeriesDetail = async (id: number) => {
    const { response } = await httpClient.get<TVSeriesDetail>(`${API_URL}/${id}`);
    return response.data;
}

export const fetchRecommendsTVSeries = async (id: string | number) => {
    const { response } = await httpClient.get<TVSeriesResponse>(`${API_URL}/${id}/recommends`);
    return response.data;
}
