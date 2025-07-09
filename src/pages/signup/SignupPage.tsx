import SignupForm from 'features/auth/signup/ui/SignupForm';
import { AuthBackground } from 'features/auth/style/AuthBackground';

export default function SignupPage() {
  return (
    <AuthBackground>
      <SignupForm />
    </AuthBackground>
  );
}
