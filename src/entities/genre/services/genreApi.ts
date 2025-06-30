import { httpClient } from "shared/api";
import { GenreResponse } from "../types/genre.type";

export const getMovieGenres = async (): Promise<GenreResponse> => {
  const response = await httpClient.get("/api/genres/movies");
  return response.data;
};

export const getTVSeriesGenres = async (): Promise<GenreResponse> => {
  const response = await httpClient.get("/api/genres/tvs");
  return response.data;
};
