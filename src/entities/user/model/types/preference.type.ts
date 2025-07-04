import { Genre } from 'entities/genre';

export interface UserPreferenceUpdateType {
  movie: {
    genreIds: number[]; // 선호하는 영화 장르 ID 목록
  };
  tv: {
    genreIds: number[]; // 선호하는 TV 프로그램 장르 ID 목록
  };
}

export interface UserContentsPreference {
  genres: Genre[];
  count: number;
}

export interface UserPreference {
  movies: UserContentsPreference; // 선호하는 영화 장르 목록과 개수
  tvs: UserContentsPreference; // 선호하는 TV 프로그램 장르 목록과 개
}
