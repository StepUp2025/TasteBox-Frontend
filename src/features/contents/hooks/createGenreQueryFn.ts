import { fetchMoviesByGenre, fetchTVsByGenre } from 'entities/contents/model';

export const createMovieByGenreQueryFn = (genreId: number[]) => {
  return (page: number, limit: number) =>
    fetchMoviesByGenre(genreId, page, limit);
};

export const createTVByGenreQueryFn = (genreId: number[]) => {
  return (page: number, limit: number) => fetchTVsByGenre(genreId, page, limit);
};
