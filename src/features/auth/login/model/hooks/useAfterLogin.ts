// shared/hooks/useHandleLoginSuccess.ts

import { useAuthStore } from 'entities/auth/model/store/authStore';
import { LoginResponse } from 'entities/auth/model/types/auth.type';
import { useNavigate } from 'react-router-dom';

export const useAfterLogin = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return ({ accessToken, isPreferenceSet }: LoginResponse) => {
    if (!accessToken) return;

    console.log('로그인 성공');
    console.log('token', accessToken);

    setAccessToken(accessToken);

    if (isPreferenceSet) {
      navigate('/');
    } else {
      navigate('/genre/movie');
    }
  };
};
