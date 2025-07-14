import { ContentType } from 'entities/contents/model';
import { TabOption } from './TabOption.type';

//장르별 조회는 추가 예정
export const tabMap: Record<ContentType, TabOption[]> = {
  movie: [
    {
      id: 'byGenre',
      label: '추천 영화',
      queryKey: ['movies', 'byGenre'],
      queryFn: null as any, // 장르별 조회 밖에서 고차함수로 생
    },
    {
      id: 'popular',
      label: '인기',
      queryKey: ['movies', 'popular'],
      queryFn: (page, limit) =>
        import('entities/contents/model').then((m) =>
          m.fetchPopularMovies(page, limit),
        ),
    },
    {
      id: 'nowPlaying',
      label: '현재 상영중',
      queryKey: ['movies', 'nowPlaying'],
      queryFn: (page, limit) =>
        import('entities/contents/model').then((m) =>
          m.fetchNowPlayingMovies(page, limit),
        ),
    },
    {
      id: 'topRated',
      label: '높은 평점',
      queryKey: ['movies', 'topRated'],
      queryFn: (page, limit) =>
        import('entities/contents/model').then((m) =>
          m.fetchTopRatedMovies(page, limit),
        ),
    },
  ],
  tv: [
    {
      id: 'byGenre',
      label: '추천 TV시리즈',
      queryKey: ['tv', 'byGenre'],
      queryFn: null as any, // 장르별 조회 밖에서 고차함수로 생성 예정
    },
    {
      id: 'popular',
      label: '인기',
      queryKey: ['tv', 'popular'],
      queryFn: (page, limit) =>
        import('entities/contents/model').then((m) =>
          m.fetchPopularTVs(page, limit),
        ),
    },
    {
      id: 'onTheAir',
      label: '현재 방영중',
      queryKey: ['tv', 'onTheAir'],
      queryFn: (page, limit) =>
        import('entities/contents/model').then((m) =>
          m.fetchOnTheAirTVs(page, limit),
        ),
    },
    {
      id: 'topRated',
      label: '높은 평점',
      queryKey: ['tv', 'topRated'],
      queryFn: (page, limit) =>
        import('entities/contents/model').then((m) =>
          m.fetchTopRatedTVs(page, limit),
        ),
    },
  ],
};
