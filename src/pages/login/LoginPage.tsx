import LoginForm from 'features/auth/login/ui/LoginForm';
import { AuthBackground } from 'features/auth/style/AuthBackground';

export default function LoginPage() {
  return (
    <AuthBackground>
      <LoginForm />
    </AuthBackground>
  );
}
