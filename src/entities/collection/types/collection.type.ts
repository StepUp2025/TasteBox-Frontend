import { ContentType } from 'entities/contents/model/types/contents.type';
export interface CollectionContent {
  id: number;
  posterPath: string | null;
  title: string;
  contentType: ContentType;
}
export interface CollectionBase {
  title: string;
  description: string;
  thumbnail: string;
}
export interface CollectionListItem extends CollectionBase {
  id: number;
  contents: number[];
}
export interface CreateCollectionRequest {
  title: string;
  description: string;
  thumbnail: File | null;
}
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
export type UpdateCollectionRequest = Partial<CreateCollectionRequest>;
export interface CollectionCard {
  id: number;
  title: string;
  thumbnail: string;
}
