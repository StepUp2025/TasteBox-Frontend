import { httpClient } from 'shared/api';
import { GenreResponse } from '../types/genre.type';

export const getMovieGenres = async (): Promise<GenreResponse> => {
  const response = await httpClient.get('/genres/movies');
  return response.data;
};

export const getTVSeriesGenres = async (): Promise<GenreResponse> => {
  const response = await httpClient.get('/genres/tvs');
  return response.data;
};
