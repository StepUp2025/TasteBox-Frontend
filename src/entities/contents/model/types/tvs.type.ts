import { Contents } from "./Contents.type";

export interface TVsResponse {
    tvs: Contents[];
    page?: number;
    totalpages? : number;
};

export interface TVsDetail extends Contents {
    firstAirDate: string;
    lastAirDate: string;
    inProduction: boolean;
    numberOfSeasons: number;
    numberOfEpisodes: number;
    languages: string[];
    seasons: {id:number;title:string; poster_path:string}[];
  }