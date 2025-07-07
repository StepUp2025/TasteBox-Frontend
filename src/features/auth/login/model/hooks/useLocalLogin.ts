import { useMutation } from '@tanstack/react-query';
import { login } from 'entities/auth/model';
import {
  LoginRequestType,
  LoginResponse,
} from 'entities/auth/model/types/auth.type';
import { useAfterLogin } from './useAfterLogin';

export const useLocalLogin = () => {
  const afterLogin = useAfterLogin();
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    LoginResponse,
    unknown,
    LoginRequestType
  >({
    mutationFn: login,
    onSuccess: (res) => {
      // 로그인 성공 후 처리 로직
      afterLogin(res); // 로그인 후 처리 함수 호출
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
