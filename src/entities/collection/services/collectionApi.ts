import { authClient } from 'shared/api';
import {
  CreateCollectionRequest,
  CreateCollectionResponse,
  GetCollectionDetailResponse,
  GetCollectionResponse,
  ModifyContentsRequest,
  UpdateCollectionRequest,
} from '../types/collection.type';

export const createCollection = async (
  body: CreateCollectionRequest,
): Promise<CreateCollectionResponse> => {
  const response = await authClient.post('/collections', body);
  return response.data;
};

export const getCollection = async (): Promise<GetCollectionResponse> => {
  const response = await authClient.get('/collections');
  return response.data;
};

export const getCollectionById = async (
  id: number,
): Promise<GetCollectionDetailResponse> => {
  const response = await authClient.get(`/collections/${id}`);
  return response.data;
};

export const updateCollection = async (
  id: number,
  body: UpdateCollectionRequest,
): Promise<void> => {
  await authClient.patch(`/collections/${id}`, body);
};

export const addContentsToCollection = async (
  id: number,
  body: ModifyContentsRequest,
): Promise<void> => {
  await authClient.post(`/collections/${id}/contents`, body);
};

export const removeContentsFromCollection = async (
  id: number,
  body: ModifyContentsRequest,
): Promise<void> => {
  await authClient.delete(`/collections/${id}/contents`, {
    data: body,
  });
};

export const deleteCollection = async (id: number): Promise<void> => {
  await authClient.delete(`/collections/${id}`);
};
