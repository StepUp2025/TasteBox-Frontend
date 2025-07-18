import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormLayout } from 'features/auth/style/AuthFormLayout';
import { PackageOpen } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { isValidationError } from 'shared/types/CustomErrorResponse';
import { Button, IconPreset, InputText, Title } from 'shared/ui';
import { setErrorFromServer } from 'shared/validation/setErrorFromServer';
import { toast } from 'sonner';
import { useSignup } from '../hooks/useSignup';
import { SignupFormValues, signupSchema } from '../validation/signupSchema';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending } = useSignup({
    onSuccess: () => {
      toast.success('회원가입이 완료되었어요!');
      navigate('/login');
    },
    onError: (error) => {
      if (isValidationError(error)) {
        // 백엔드에서 받은 유효성 에러를 폼에 띄움
        setErrorFromServer<SignupFormValues>(error, setError);
      } else {
        // 일반적인 에러 처리
        const message =
          error.response?.data?.message || '회원가입에 실패했습니다.';
        toast.error(message as string);
      }
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    mutate(data);
  };

  const navigate = useNavigate();
  const handleGoToMain = () => {
    navigate('/');
  };

  return (
    <AuthFormLayout>
      <div className="container">
        <div className="header">
          <Button
            buttonSize="menuNarrow"
            fontSize="large"
            scheme="primary"
            borderRadius="medium"
            disableHoverOverlay={true}
            onClick={handleGoToMain}
          >
            <IconPreset width={32} color="constantWhite">
              <PackageOpen />
            </IconPreset>
          </Button>
          <Title size="large" color="primary">
            TasteBox 회원가입
          </Title>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <InputText
              placeholder="이메일을 입력해주세요"
              {...register('email')}
              error={errors.email?.message}
            />
            <InputText
              placeholder="비밀번호를 입력해주세요"
              {...register('password')}
              error={errors.password?.message}
              type="password"
            />
            <InputText
              placeholder="비밀번호를 한 번 더 입력해주세요"
              {...register('passwordConfirm')}
              error={errors.passwordConfirm?.message}
              type="password"
            />
            <InputText
              placeholder="닉네임을 입력해주세요"
              {...register('nickname')}
              error={errors.nickname?.message}
            />
            <InputText
              placeholder="전화번호를 입력해주세요"
              {...register('contact')}
              error={errors.contact?.message}
            />
          </div>

          <Button
            buttonSize="large"
            fontSize="small"
            scheme="primary"
            type="submit"
            borderRadius="round"
            disabled={isPending}
          >
            회원가입
          </Button>
        </form>
        <p className="to-link">
          이미 계정이 있으신가요? <Link to="/login">로그인하기</Link>
        </p>
      </div>
    </AuthFormLayout>
  );
};

export default SignupForm;
