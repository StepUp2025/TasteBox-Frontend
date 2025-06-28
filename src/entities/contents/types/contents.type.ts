export interface Content {
    id: number;
    poster_path: string | null;
    title: string;
    content_type: "movie" | "tv";
  }

  export interface LatestContentsResponse {
    contents: Content[];
    count: number;
  }