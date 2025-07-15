import { GenreEmoji } from 'entities/genre';

export interface UserPreferenceUpdateType {
  movie: {
    genreIds: number[]; // 선호하는 영화 장르 ID 목록
  };
  tv: {
    genreIds: number[]; // 선호하는 TV 프로그램 장르 ID 목록
  };
}

export interface UserContentsPreference {
  genres: GenreEmoji[];
  count: number;
}

export interface UserPreference {
  movie: UserContentsPreference; // 선호하는 영화 장르 목록과 개수
  tv: UserContentsPreference; // 선호하는 TV 프로그램 장르 목록과 개
}
