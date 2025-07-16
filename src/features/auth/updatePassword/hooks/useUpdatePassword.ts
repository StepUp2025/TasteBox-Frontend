import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UpdatePasswordRequestType, updatePassword } from 'entities/auth/model';
import { useNavigate } from 'react-router-dom';
import {
  CustomErrorResponse,
  CustomValidationErrorResponse,
} from 'shared/types/CustomErrorResponse';

export const useUpdatePassword = (option?: {
  onSuccess?: () => void;
  onError?: (
    error: AxiosError<CustomErrorResponse | CustomValidationErrorResponse>,
  ) => void;
}) => {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    AxiosError<CustomErrorResponse | CustomValidationErrorResponse>,
    UpdatePasswordRequestType
  >({
    mutationFn: updatePassword,
    onSuccess: () => {
      console.log('비밀번호가 성공적으로 변경되었습니다.');
      navigate('/mypage', { replace: true }); // 마이페이지로 리다이렉트
      option?.onSuccess?.();
    },
    onError: (error) => {
      console.error('비밀번호 변경 실패:', error);
      option?.onError?.(error);
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
