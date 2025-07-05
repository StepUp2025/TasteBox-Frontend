import { useMutation } from '@tanstack/react-query';
import { signup } from 'entities/auth/model';
import { SignupRequestType } from 'entities/auth/model/types/auth.type';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    void,
    unknown,
    SignupRequestType
  >({
    mutationFn: signup,
    onSuccess: () => {
      // 회원가입 성공 후 처리 로직
      console.log('회원가입 성공');
      navigate('/login'); // 회원가입 후 로그인 페이지로 이동
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
