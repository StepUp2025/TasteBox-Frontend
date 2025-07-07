import { AuthProvider } from 'entities/auth/model/types/auth.type';
import { useAfterLogin } from './useAfterLogin';

const backend = import.meta.env.VITE_API_BASE_URL; // 또는 실제 배포된 API 주소

export const useOAUthLogin = () => {
  const afterLogin = useAfterLogin();

  const loginWith = (provider: AuthProvider) => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const popup = window.open(
      `${backend}/auth/${provider}/login`, //  provider에 따라 경로 변경
      `oauth-${provider}`,
      `width=${width},height=${height},left=${left},top=${top}`,
    );

    // 메시지 수신
    const receiveMessage = (event: MessageEvent) => {
      if (event.origin !== backend) return;

      afterLogin(event.data); // 로그인 후 처리 함수 호출

      popup?.close();
      window.removeEventListener('message', receiveMessage);
    };

    window.addEventListener('message', receiveMessage);
  };
  return {
    loginWithGoogle: () => loginWith('google'),
    loginWithKakao: () => loginWith('kakao'),
  };
};
