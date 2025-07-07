import { useQuery } from '@tanstack/react-query';
import {
  fetchOnTheAirTVs,
  fetchPopularTVs,
  fetchRecommendsTVs,
  fetchTopRatedTVs,
  fetchTVDetail,
  fetchTVsByGenre,
} from 'entities/contents/model';
import { ParameterTypes } from 'entities/contents/model/types/contents.type';

export function useTVsByGenre(params: ParameterTypes) {
  return useQuery({
    queryKey: ['tvs', 'genre', params],
    queryFn: () => fetchTVsByGenre(params),
    enabled: !!params,
  });
}

export function usePopularTVs(page: number = 1) {
  return useQuery({
    queryKey: ['tvs', 'popular', page],
    queryFn: () => fetchPopularTVs(page),
  });
}

export function useOnTheAirTVs(page: number = 1) {
  return useQuery({
    queryKey: ['tvs', 'on-the-air', page],
    queryFn: () => fetchOnTheAirTVs(page),
  });
}

export function useTopRatedTVs(page: number = 1) {
  return useQuery({
    queryKey: ['tvs', 'top-rated', page],
    queryFn: () => fetchTopRatedTVs(page),
  });
}

export function useTVDetail(id: number) {
  return useQuery({
    queryKey: ['tvs', 'detail', id],
    queryFn: () => fetchTVDetail(id),
    enabled: !!id,
  });
}

export function useRecommendsTVs(id: string | number) {
  return useQuery({
    queryKey: ['tvs', id, 'recommends'],
    queryFn: () => fetchRecommendsTVs(id),
    enabled: !!id,
  });
}
