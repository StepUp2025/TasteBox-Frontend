import { ContentType } from 'entities/contents/model/types/contents.type';

export interface ContentItem {
  id: number;
  contentType: ContentType; // 'movie' | 'tv'
}

export interface CollectionBase {
  title: string;
  description: string;
  thumbnail: string;
}

export type CreateCollectionRequest = CollectionBase;

export interface CreateCollectionResponse {
  id: number;
}

export interface CollectionItem extends CollectionBase {
  id: number;
}

export interface GetCollectionResponse {
  collections: CollectionItem[];
  count: number;
}

export interface GetCollectionDetailResponse extends CollectionItem {
  contents: {
    id: number;
    posterPath: string | null;
    title: string;
    contentType: ContentType;
  }[];
}

export type UpdateCollectionRequest = Partial<CollectionBase>;

export interface ModifyContentsRequest {
  contents: ContentItem[];
}
