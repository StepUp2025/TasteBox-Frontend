import { GenreResponse } from 'entities/genre/types/genre.type';
import { http } from 'msw';
import { createSuccessResponse } from '../utils/response';

const mockMovieGenres: GenreResponse['genres'] = [
  { id: 28, name: '액션', emoji: '🔫' },
  { id: 12, name: '모험', emoji: '🧭' },
  { id: 16, name: '애니메이션', emoji: '🎨' },
  { id: 35, name: '코미디', emoji: '😂' },
  { id: 80, name: '범죄', emoji: '🕵️‍♂️' },
  { id: 99, name: '다큐멘터리', emoji: '🎥' },
  { id: 18, name: '드라마', emoji: '🎭' },
  { id: 10751, name: '가족', emoji: '👨‍👩‍👧‍👦' },
  { id: 14, name: '판타지', emoji: '🐉' },
  { id: 36, name: '역사', emoji: '📜' },
  { id: 27, name: '공포', emoji: '👻' },
  { id: 10402, name: '음악', emoji: '🎵' },
  { id: 9648, name: '미스터리', emoji: '🕵️' },
  { id: 10749, name: '로맨스', emoji: '💕' },
  { id: 878, name: 'SF', emoji: '🚀' },
  { id: 10770, name: 'TV 영화', emoji: '📺' },
  { id: 53, name: '스릴러', emoji: '😱' },
  { id: 10752, name: '전쟁', emoji: '⚔️' },
  { id: 37, name: '서부', emoji: '🤠' },
];

const mockTvGenres: GenreResponse['genres'] = [
  { id: 10759, name: '액션 & 어드벤처', emoji: '🗡️' },
  { id: 16, name: '애니메이션', emoji: '🎨' },
  { id: 35, name: '코미디', emoji: '😂' },
  { id: 80, name: '범죄', emoji: '🕵️‍♂️' },
  { id: 99, name: '다큐멘터리', emoji: '🎥' },
  { id: 18, name: '드라마', emoji: '🎭' },
  { id: 10751, name: '가족', emoji: '👨‍👩‍👧‍👦' },
  { id: 10762, name: '키즈', emoji: '🧒' },
  { id: 9648, name: '미스터리', emoji: '🕵️' },
  { id: 10763, name: '뉴스', emoji: '📰' },
  { id: 10764, name: '리얼리티', emoji: '📸' },
  { id: 10765, name: 'SF & 판타지', emoji: '🪐' },
  { id: 10766, name: '막장 드라마', emoji: '💄' },
  { id: 10767, name: '토크쇼', emoji: '🎙️' },
  { id: 10768, name: '전쟁 & 정치', emoji: '🪖' },
  { id: 37, name: '서부', emoji: '🤠' },
];

export const genreHandlers = [
  http.get('/genres/movies', () => {
    return createSuccessResponse(undefined, {
      genres: mockMovieGenres,
    });
  }),

  http.get('/genres/tvs', () => {
    return createSuccessResponse(undefined, {
      genres: mockTvGenres,
    });
  }),
];
