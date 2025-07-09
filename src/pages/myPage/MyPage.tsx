import UserCollectionList from 'widgets/user/userProfile/UserCollectionList';
import UserPreferenceWidget from 'widgets/user/userProfile/UserPreferenceWidget';
import UserProfileSettingWidget from 'widgets/user/userProfile/UserProfileSettingWidget';

export default function MyPage() {
  return (
    <div>
      <UserProfileSettingWidget />
      <UserPreferenceWidget />
      <UserCollectionList />
    </div>
  );
}
