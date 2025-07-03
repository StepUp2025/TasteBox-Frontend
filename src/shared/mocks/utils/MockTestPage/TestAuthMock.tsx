import {
  login,
  loginGoogle,
  loginKakao,
  logout,
  refreshToken,
  resetPassword,
  signup,
} from 'entities/auth/model/services/authApi';
import {
  Divider,
  SectionTitle,
  TestButton,
  useTestLogger,
} from 'shared/mocks/utils/MockTestUtils';

const TestAuthMock = () => {
  const { log, logResult } = useTestLogger();

  return (
    <div style={{ padding: 20 }}>
      <h1>🧪 Auth API 테스트 페이지</h1>

      <SectionTitle text="📌 회원가입 테스트" />
      <TestButton
        label="중복 이메일"
        onClick={async () => {
          try {
            const res = await signup({
              email: 'already@mail.com',
              password: '1234',
              nickname: '닉네임',
            });
            logResult('signup (중복 이메일)', res);
          } catch (err) {
            logResult('signup error', err);
          }
        }}
      />
      <TestButton
        label="중복 닉네임"
        onClick={async () => {
          try {
            const res = await signup({
              email: 'new@mail.com',
              password: '1234',
              nickname: '중복닉네임',
            });
            logResult('signup (중복 닉네임)', res);
          } catch (err) {
            logResult('signup error', err);
          }
        }}
      />
      <TestButton
        label="회원가입 성공"
        onClick={async () => {
          try {
            const res = await signup({
              email: 'new@mail.com',
              password: '1234',
              nickname: '닉네임',
            });
            logResult('signup (성공)', res);
          } catch (err) {
            logResult('signup error', err);
          }
        }}
      />

      <Divider />

      <SectionTitle text="🔐 로그인 테스트" />
      <TestButton
        label="로그인 성공"
        onClick={async () => {
          try {
            const res = await login({
              email: 'stepup@mail.com',
              password: '1234',
            });
            logResult('login (성공)', res);
          } catch (err) {
            logResult('login error', err);
          }
        }}
      />
      <TestButton
        label="로그인 실패"
        onClick={async () => {
          try {
            const res = await login({
              email: 'wrong@mail.com',
              password: 'wrong',
            });
            logResult('login (실패)', res);
          } catch (err) {
            logResult('login error', err);
          }
        }}
      />

      <Divider />

      <SectionTitle text="♻️ 토큰 관련 테스트" />
      <TestButton
        label="로그아웃"
        onClick={async () => {
          const res = await logout();
          logResult('logout', res);
        }}
      />
      <TestButton
        label="리프레시 토큰"
        onClick={async () => {
          const res = await refreshToken();
          logResult('refreshToken', res);
        }}
      />

      <Divider />

      <SectionTitle text="🔑 비밀번호 재설정 테스트" />
      <TestButton
        label="OAuth 계정"
        onClick={async () => {
          try {
            const res = await resetPassword({
              currentPassword: 'oauth-account',
              newPassword: '1234',
              newPasswordConfirm: '1234',
            });
            logResult('resetPassword (OAuth 계정)', res);
          } catch (err) {
            logResult('resetPassword error', err);
          }
        }}
      />
      <TestButton
        label="유저 없음"
        onClick={async () => {
          try {
            const res = await resetPassword({
              currentPassword: 'not-found',
              newPassword: '1234',
              newPasswordConfirm: '1234',
            });
            logResult('resetPassword (유저 없음)', res);
          } catch (err) {
            logResult('resetPassword error', err);
          }
        }}
      />
      <TestButton
        label="비밀번호 불일치"
        onClick={async () => {
          try {
            const res = await resetPassword({
              currentPassword: '1234',
              newPassword: 'abc',
              newPasswordConfirm: 'def',
            });
            logResult('resetPassword (불일치)', res);
          } catch (err) {
            logResult('resetPassword error', err);
          }
        }}
      />
      <TestButton
        label="비밀번호 변경 성공"
        onClick={async () => {
          try {
            const res = await resetPassword({
              currentPassword: '1234',
              newPassword: 'abc',
              newPasswordConfirm: 'abc',
            });
            logResult('resetPassword (성공)', res);
          } catch (err) {
            logResult('resetPassword error', err);
          }
        }}
      />

      <Divider />

      <SectionTitle text="🌐 OAuth 테스트" />
      <TestButton
        label="구글 로그인 리다이렉트"
        onClick={async () => {
          try {
            const res = await loginGoogle();
            logResult('loginGoogle', res);
          } catch (err) {
            logResult('loginGoogle error', err);
          }
        }}
      />
      <TestButton
        label="카카오 로그인 리다이렉트"
        onClick={async () => {
          try {
            const res = await loginKakao();
            logResult('loginKakao', res);
          } catch (err) {
            logResult('loginKakao error', err);
          }
        }}
      />

      <Divider />

      <pre style={{ marginTop: 20, whiteSpace: 'pre-wrap' }}>{log}</pre>
    </div>
  );
};

export default TestAuthMock;
