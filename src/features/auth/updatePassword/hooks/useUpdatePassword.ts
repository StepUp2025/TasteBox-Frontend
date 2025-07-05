import { useMutation } from '@tanstack/react-query';
import { UpdatePasswordRequestType, updatePassword } from 'entities/auth/model';
import { useNavigate } from 'react-router-dom';

export const useUpdatePassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: UpdatePasswordRequestType) => updatePassword(data),
    onSuccess: () => {
      console.log('비밀번호가 변경되었습니다.');
      navigate('/mypage', { replace: true });
    },
    onError: (error) => {
      console.error('비밀번호 변경 실패:', error);
    },
  });
};
