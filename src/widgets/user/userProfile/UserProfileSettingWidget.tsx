import UpdatePasswordModal from 'features/auth/updatePassword/ui/UpdatePasswordModal';
import { useGetUserProfile } from 'features/user/profile/hooks/useGetUserProfile';
import UserProfileForm from 'features/user/profile/ui/UserProfileForm';
import { useState } from 'react';
import { Button } from 'shared/ui';
import styled from 'styled-components';
import { MYPAGE_HEADER_MARGIN } from '../constants';

const UserProfileSettingWidget = () => {
  const { data: user, isLoading } = useGetUserProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (isLoading || !user) return <div>로딩 중...</div>;
  return (
    <UserProfileSettingStyle>
      <h2>프로필</h2>
      <div className="form-container">
        <UserProfileForm user={user} />
        {user.provider === 'local' && (
          <Button
            buttonSize="large"
            fontSize="xsmall"
            scheme="secondary"
            borderRadius="medium"
            onClick={handleOpenModal}
          >
            비밀번호 수정
          </Button>
        )}
      </div>
      <UpdatePasswordModal open={isModalOpen} onClose={handleCloseModal} />
    </UserProfileSettingStyle>
  );
};

const UserProfileSettingStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

    h2 {
    align-self: flex-start;
    margin-left: ${MYPAGE_HEADER_MARGIN};
    margin-bottom: 24px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 520px;
    margin-top: 24px;
  }
`;

export default UserProfileSettingWidget;
