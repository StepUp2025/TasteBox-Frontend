import { authClient } from 'shared/api';
import { LocalUser, OAuthUser } from '../types/user.type';

export const fetchUserProfile = async (): Promise<LocalUser | OAuthUser> => {
  const response = await authClient.get('/users/profile');
  return response.data;
};

export const updateProfile = async (formData: FormData) => {
  return await authClient.patch('/users/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
