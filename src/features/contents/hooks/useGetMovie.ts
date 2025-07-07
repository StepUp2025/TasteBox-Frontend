import { useQuery } from '@tanstack/react-query';
import {
  fetchMovieDetail,
  fetchMoviesByGenre,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchRecommends,
  fetchTopRatedMovies,
} from 'entities/contents/model';

import { ParameterTypes } from 'entities/contents/model/types/contents.type';

export function useMoviesByGenre(params: ParameterTypes) {
  return useQuery({
    queryKey: ['movies', 'genre', params],
    queryFn: () => fetchMoviesByGenre(params),
    enabled: !!params,
  });
}

export function usePopularMovies(page: number = 1) {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => fetchPopularMovies(page),
  });
}

export function useNowPlayingMovies(page: number = 1) {
  return useQuery({
    queryKey: ['movies', 'now-playing', page],
    queryFn: () => fetchNowPlayingMovies(page),
  });
}

export function useTopRatedMovies(page: number = 1) {
  return useQuery({
    queryKey: ['movies', 'top-rated', page],
    queryFn: () => fetchTopRatedMovies(page),
  });
}

export function useMovieRecommends(id: string | number) {
  return useQuery({
    queryKey: ['movies', id, 'recommends'],
    queryFn: () => fetchRecommends(id),
    enabled: !!id,
  });
}

export function useTVDetail(id: number) {
  return useQuery({
    queryKey: ['tvs', 'detail', id],
    queryFn: () => fetchMovieDetail(id),
    enabled: !!id,
  });
}
