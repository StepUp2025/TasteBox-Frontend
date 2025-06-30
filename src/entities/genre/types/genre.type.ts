export interface Genre {
  id: number;
  name: string;
  emoji: string;
}

export interface GenreResponse {
  genres: Genre[];
  count: number;
}
