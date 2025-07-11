import { authClient } from 'shared/api';
import {
  CreateCollectionRequest,
  CreateCollectionResponse,
  GetCollectionDetailResponse,
  GetCollectionsResponse,
  UpdateCollectionRequest,
} from '../types/collection.type';

export const createCollection = async (body: CreateCollectionRequest) => {
  const response = await authClient.post<CreateCollectionResponse>(
    '/collections',
    body,
  );
  return response.data;
};

export const getCollectionList = async (): Promise<GetCollectionsResponse> => {
  const response = await authClient.get('/collections');
  return response.data;
};

export const getCollectionDetail = async (
  id: number,
): Promise<GetCollectionDetailResponse> => {
  const response = await authClient.get(`/collections/${id}`);
  return response.data;
};

export const updateCollection = async (
  id: number,
  body: UpdateCollectionRequest,
): Promise<string> => {
  const response = await authClient.patch(`/collections/${id}`, body);
  return response.data;
};

export const addCollectionContents = async (
  id: number,
  contentIds: number[],
): Promise<string> => {
  const params = new URLSearchParams();
  contentIds.forEach((id) => params.append('contentId', id.toString()));

  const response = await authClient.post(`/collections/${id}/contents`);
  return response.data;
};

export const removeCollectionContents = async (
  id: number,
  contentIds: number[],
): Promise<string> => {
  const params = new URLSearchParams();
  contentIds.forEach((id) => params.append('contentId', id.toString()));

  const response = await authClient.delete(
    `/collections/${id}/contents?${params.toString()}`,
  );
  return response.data;
};

export const deleteCollection = async (id: number): Promise<string> => {
  const response = await authClient.delete(`/collections/${id}`);
  return response.data;
};
