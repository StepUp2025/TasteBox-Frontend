import axios from "axios";
import {TVSeriesResponse, TVSeriesDetail} from "./types"

const API_URL = 'localhost:PORT/api/tvs'

export const fetchTVSeriesByGenre = async (genre_id:string, page = 1) => {
    const {data} = await axios.get<TVSeriesResponse>(`${API_URL}? genre_id=${genre_id}&page=${page}`);
    return data;
}

export const fetchPopularTVSeries = async (page = 1) => {
    const {data} = await axios.get<TVSeriesResponse>(`${API_URL}/popular? page=${page}`);
    return data;
}

export const fetchOnTheAirTVSeries = async (page = 1) => {
    const {data} = await axios.get<TVSeriesResponse>(`${API_URL}/on-the-air?page=${page}`);
    return data;
}

export const fetchTopRatedTVSeries = async (page = 1) => {
    const {data} = await axios.get<TVSeriesResponse>(`${API_URL}/top-rated?page=${page}`);
    return data;
}

export const fetchTVSeriesDetail = async (id:number) => {
    const {data} = await axios.get<TVSeriesDetail>(`${API_URL}/${id}`);
    return data;
}

export const fetchRecommendsTVSeries = async (id: string | number) => {
    const {data} = await axios.get<TVSeriesResponse>(`${API_URL}/${id}/recommends`);
    return data;
}
