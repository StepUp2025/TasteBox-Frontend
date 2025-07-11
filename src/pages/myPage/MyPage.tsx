import styled from 'styled-components';
import UserPreferenceWidget from 'widgets/user/userProfile/UserPreferenceWidget';
import UserProfileSettingWidget from 'widgets/user/userProfile/UserProfileSettingWidget';

export default function MyPage() {
  return (
    <MyPageLayout>
      <UserProfileSettingWidget />
      <UserPreferenceWidget />
    </MyPageLayout>
  );
}

const MyPageLayout = styled.div`
  margin-top: 3rem;
`;
