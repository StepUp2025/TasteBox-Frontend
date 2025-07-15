import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signup } from 'entities/auth/model';
import { SignupRequestType } from 'entities/auth/model/types/auth.type';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';

export const useSignup = (option?: {
  onSuccess?: () => void;
  onError?: (error: AxiosError<CustomErrorResponse>) => void;
}) => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    AxiosError<CustomErrorResponse>,
    SignupRequestType
  >({
    mutationFn: signup,
    onSuccess: () => {
      option?.onSuccess?.();
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
