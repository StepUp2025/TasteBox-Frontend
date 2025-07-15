import {
  fetchUserProfile,
  updateProfile,
} from 'entities/user/model/services/userApi';
import {
  Divider,
  SectionTitle,
  TestButton,
  useTestLogger,
} from 'shared/mocks/utils/MockTestUtils';

const TestUserMock = () => {
  const { log, logResult } = useTestLogger();

  return (
    <div style={{ padding: 20 }}>
      <h1>🧪 User API 테스트 페이지</h1>

      <SectionTitle text="👤 프로필 조회 테스트" />
      <TestButton
        label="프로필 조회 성공"
        onClick={async () => {
          try {
            const res = await fetchUserProfile();
            logResult('fetchUserProfile (성공)', res);
          } catch (err) {
            logResult('fetchUserProfile error', err);
          }
        }}
      />
      <TestButton
        label="프로필 조회 실패 (유저 없음)"
        onClick={async () => {
          try {
            const url = new URL('/users/profile', window.location.origin);
            url.searchParams.set('mockError', 'not-found');

            const res = await fetch(url.toString()); // 강제로 실패 URL 호출
            const data = await res.json();
            logResult('fetchUserProfile (유저 없음)', data);
          } catch (err) {
            logResult('fetchUserProfile error', err);
          }
        }}
      />

      <Divider />

      <SectionTitle text="🛠️ 프로필 수정 테스트" />
      <TestButton
        label="중복 닉네임"
        onClick={async () => {
          try {
            const res = await updateProfile({
              nickname: '중복닉네임',
              contact: '010-0000-0000',
            });
            logResult('updateProfile (중복 닉네임)', res);
          } catch (err) {
            logResult('updateProfile error', err);
          }
        }}
      />
      <TestButton
        label="프로필 수정 성공"
        onClick={async () => {
          try {
            const res = await updateProfile({
              nickname: '새닉네임',
              contact: '010-1234-5678',
            });
            logResult('updateProfile (성공)', res);
          } catch (err) {
            logResult('updateProfile error', err);
          }
        }}
      />

      <Divider />

      <pre style={{ marginTop: 20, whiteSpace: 'pre-wrap' }}>{log}</pre>
    </div>
  );
};

export default TestUserMock;
