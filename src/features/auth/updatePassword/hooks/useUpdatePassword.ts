import { useMutation } from '@tanstack/react-query';
import { UpdatePasswordRequestType, updatePassword } from 'entities/auth/model';
import { useNavigate } from 'react-router-dom';

export const useUpdatePassword = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    unknown,
    UpdatePasswordRequestType
  >({
    mutationFn: updatePassword,
    onSuccess: () => {
      console.log('비밀번호가 성공적으로 변경되었습니다.');
      navigate('/mypage', { replace: true }); // 마이페이지로 리다이렉트
    },
    onError: (error) => {
      console.error('비밀번호 변경 실패:', error);
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
