import { useQuery } from '@tanstack/react-query';
import { getMovieGenres } from '../../../entities/genre/services/genreApi';
import { GenreResponse } from '../../../entities/genre/types/genre.type';

export const useGetMovieGenres = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<GenreResponse>({
    queryKey: ['genres', 'movies'],
    queryFn: getMovieGenres,
  });

  return { data, isLoading, isError, error, refetch };
};
