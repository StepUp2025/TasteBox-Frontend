import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { login } from 'entities/auth/model';
import {
  LoginRequestType,
  LoginResponse,
} from 'entities/auth/model/types/auth.type';
import {
  CustomErrorResponse,
  CustomValidationErrorResponse,
} from 'shared/types/CustomErrorResponse';
import { useAfterLogin } from './useAfterLogin';

export const useLocalLogin = (option?: {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (
    error: AxiosError<CustomErrorResponse | CustomValidationErrorResponse>,
  ) => void;
}) => {
  const afterLogin = useAfterLogin();
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    LoginResponse,
    AxiosError<CustomErrorResponse | CustomValidationErrorResponse>,
    LoginRequestType
  >({
    mutationFn: login,
    onSuccess: (res) => {
      // 로그인 성공 후 처리 로직
      afterLogin(res); // 로그인 후 처리 함수 호출
      option?.onSuccess?.(res); // 컴포넌트에서 후처리 로직 추가 가능
    },
    onError: (err) => {
      option?.onError?.(err);
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
