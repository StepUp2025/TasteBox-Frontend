import { authClient } from 'shared/api';
import {
  UserContentsPreference,
  UserPreference,
  UserPreferenceUpdateType,
} from '../types/preference.type';

export const updatePreference = async (data: UserPreferenceUpdateType) => {
  const response = await authClient.put('/users/preferences', data);
  return response.data;
};

export const fetchPreference = async (): Promise<UserPreference> => {
  const response = await authClient.get('/users/preferences');
  return response.data;
};

export const fetchMoviePreference =
  async (): Promise<UserContentsPreference> => {
    const response = await authClient.get('/users/preferences/movies');
    return response.data;
  };

export const fetchTVPreference = async (): Promise<UserContentsPreference> => {
  const response = await authClient.get('/users/preferences/tvs');
  return response.data;
};
