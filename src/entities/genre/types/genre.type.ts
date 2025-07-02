export interface Genre {
  id: number;
  name: string;
}
export interface GenreEmoji extends Genre {
  emoji: string;
}
export interface GenreResponse {
  genres: GenreEmoji[];
}
