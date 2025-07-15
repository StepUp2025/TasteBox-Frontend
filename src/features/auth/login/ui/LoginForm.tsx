import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormLayout } from 'features/auth/style/AuthFormLayout';
import { PackageOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import googleLogo from 'shared/assets/images/google-logo-icon.png';
import kakaoLogo from 'shared/assets/images/kakao-logo-icon.png';
import { Button, IconPreset, InputText, Title } from 'shared/ui';
import { toast } from 'sonner';
import { useLocalLogin } from '../model/hooks/useLocalLogin';
import { useOAUthLogin } from '../model/hooks/useOAuthLogin';
import { LoginFormValues, loginSchema } from '../model/validation/loginSchema';
import { OAuthButton } from './OAuthButton';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const { mutate, isPending } = useLocalLogin({
    onError: (error) => {
      const message = error.response?.data?.message || '로그인에 실패했습니다.';
      toast.error(message);
    },
  });
  const { loginWithGoogle, loginWithKakao } = useOAUthLogin();

  const onSubmit = (data: LoginFormValues) => {
    console.log('제출된 값:', data);
    mutate(data);
  };
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
            TasteBox 로그인
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
          </div>

          <Button
            buttonSize="large"
            fontSize="small"
            scheme="primary"
            type="submit"
            borderRadius="round"
            disabled={isPending}
          >
            로그인
          </Button>
        </form>

        <div className="divider">
          <span />
          <p className="or">또는</p>
          <span />
        </div>

        <div className="oauth-buttons">
          <OAuthButton
            provider="google"
            icon={<img src={googleLogo} alt="Google" width={28} height={28} />}
            onClick={loginWithGoogle}
          />
          <OAuthButton
            provider="kakao"
            icon={<img src={kakaoLogo} alt="Kakao" width={28} height={28} />}
            onClick={loginWithKakao}
          />
        </div>

        <p className="to-link">
          처음이신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </AuthFormLayout>
  );
};

export default LoginForm;
