export interface TVSeries {
    id: number;
    poster_path: string | null;
    title: string;
    contentType? : 'movie' | 'tvSeries';
};

export interface TVSeriesResponse {
    tvs: TVSeries[];
    page?: number;
    totalpages? : number;
}

export interface TVSeriesDetail extends TVSeries {
    overview: string;
    status: string;
    adult: boolean;
    genres: { id:number; name: string}[] ;
    first_air_date: string;
    last_air_date: string;
    in_production: boolean;
    number_of_seasons: number;
    number_of_episodes: number;
    languages: string[];
    original_language: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    backdrop_path: string | null;
    seasons: {id:number;title:string; poster_path:string}[];
  }