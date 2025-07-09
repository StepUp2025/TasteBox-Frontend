import UserPreferenceList from 'features/user/preference/ui/UserPreferenceList';

import styled from 'styled-components';
import ProfileWidgetHeader from './ProfileWidgetHeader';

const UserPreferenceWidget = () => {
  return (
    <UserPreferenceWidgetStyle>
      <ProfileWidgetHeader
        title="취향 목록 설정"
        linkTo="/genre/movie"
        linkText="취향 수정하기"
      />
      <UserPreferenceList />

      <ProfileWidgetHeader
        title="내가 추가한 컬렉션"
        linkTo="/collection"
        linkText="컬렉션 생성하기"
      />
    </UserPreferenceWidgetStyle>
  );
};

const UserPreferenceWidgetStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;



`;

export default UserPreferenceWidget;
