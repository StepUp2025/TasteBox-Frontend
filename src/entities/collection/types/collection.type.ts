import { Contents } from 'entities/contents/model/types/contents.type';
export interface CollectionBase {
  title: string;
  description: string;
  thumbnail: string;
}
export interface CollectionListItem extends CollectionBase {
  id: number;
  contents: number[];
}
export type CreateCollectionRequest = FormData;
export interface CreateCollectionResponse {
  id: number;
}
export interface GetCollectionsResponse {
  collections: CollectionListItem[];
  count: number;
}
export interface GetCollectionDetailResponse extends CollectionBase {
  id: number;
  contents: Contents[];
}

export type UpdateCollectionRequest = FormData;
export interface CollectionCard {
  id: number;
  title: string;
  thumbnail: string;
}
