import UserPreferenceList from 'features/user/preference/ui/UserPreferenceList';
import styled from 'styled-components';
import WidgetHeader from '../../WidgetHeader';

const UserPreferenceWidget = () => {
  return (
    <UserPreferenceWidgetStyle>
      <WidgetHeader
        title="취향 목록 설정"
        from="/mypage"
        linkTo="/genre/movie"
        linkText="취향 수정하기"
      />

      <UserPreferenceList />
    </UserPreferenceWidgetStyle>
  );
};

const UserPreferenceWidgetStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;



`;

export default UserPreferenceWidget;
