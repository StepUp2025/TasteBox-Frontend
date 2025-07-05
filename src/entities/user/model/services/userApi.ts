import { authClient } from 'shared/api';
import { LocalUser, OAuthUser, ProfileUpdateType } from '../types/user.type';

export const fetchUserProfile = async (): Promise<LocalUser | OAuthUser> => {
  const response = await authClient.get('/users/profile');
  return response.data;
};

export const updateProfile = async (data: ProfileUpdateType) => {
  const response = await authClient.patch('/users/profile', data);
  return response.data;
};
