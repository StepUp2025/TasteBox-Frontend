export interface CollectionContent {
  id: number;
  posterPath: string | null;
  title: string;
  contentType: 'movie' | 'tv';
}

export interface CollectionBase {
  title: string;
  description: string;
  thumbnail: string | null;
}

export interface CollectionListItem extends CollectionBase {
  id: number;
  contents: number[];
}

export interface CreateCollectionRequest extends CollectionBase {}

export interface CreateCollectionResponse {
  id: number;
}

export interface GetCollectionsResponse {
  collections: CollectionListItem[];
  count: number;
}
export interface GetCollectionDetailResponse extends CollectionBase {
  id: number;
  contents: CollectionContent[];
}

export type UpdateCollectionRequest = Partial<CollectionBase>;
