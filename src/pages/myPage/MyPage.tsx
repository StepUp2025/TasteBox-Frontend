import UserPreferenceWidget from 'widgets/user/userProfile/UserPreferenceWidget';
import UserProfileSettingWidget from 'widgets/user/userProfile/UserProfileSettingWidget';

export default function MyPage() {
  return (
    <>
      <UserProfileSettingWidget />
      <UserPreferenceWidget />
    </>
  );
}
