import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormLayout } from 'features/auth/style/AuthFormLayout';
import { PackageOpen } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, IconPreset, InputText, Title } from 'shared/ui';
import Loading from 'shared/ui/Loading/Loading';
import { useSignup } from '../hooks/useSignup';
import { SignupFormValues, signupSchema } from '../validation/signupSchema';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending } = useSignup();

  const onSubmit = (data: SignupFormValues) => {
    console.log('제출된 값:', data);
    mutate(data);
  };

  const navigate = useNavigate();
  const handleGoToMain = () => {
    navigate('/');
  };

  return (
    <AuthFormLayout>
      {isPending && <Loading />}
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
              placeholder="닉네임을 입력해주세요"
              {...register('nickname')}
              error={errors.nickname?.message}
            />
            <InputText
              placeholder="전화번호를 입력해주세요"
              {...register('phone')}
              error={errors.phone?.message}
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
