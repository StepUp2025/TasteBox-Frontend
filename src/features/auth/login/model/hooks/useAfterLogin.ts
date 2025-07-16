// shared/hooks/useHandleLoginSuccess.ts

import { useAuthStore } from 'entities/auth/model/store/authStore';
import { LoginResponse } from 'entities/auth/model/types/auth.type';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAfterLogin = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return ({ accessToken, isPreferenceSet }: LoginResponse) => {
    if (!accessToken) return;

    console.log('로그인 성공');
    toast.success('로그인에 성공했습니다!');
    setAccessToken(accessToken);
    if (import.meta.env.MODE === 'development') {
      console.log('received token', accessToken);
      console.log('stored token', useAuthStore.getState().accessToken);
    }

    if (isPreferenceSet) {
      navigate('/');
    } else {
      //장르 선택 페이지에 location.state로 'from'을 전달
      navigate('/genre/movie', { state: { from: '/login' } });
    }
  };
};
