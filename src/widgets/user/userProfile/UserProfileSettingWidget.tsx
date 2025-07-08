import UpdatePasswordModal from 'features/auth/updatePassword/ui/UpdatePasswordModal';
import { useState } from 'react';
import { Button } from 'shared/ui';
import styled from 'styled-components';

const UserProfileSettingWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <UserProfileSettingStyle>
      <h1>UserProfileSetting</h1>
      <Button
        buttonSize="large"
        fontSize="xsmall"
        scheme="secondary"
        borderRadius="medium"
        onClick={handleOpenModal}
      >
        비밀번호 수정
      </Button>
      <UpdatePasswordModal open={isModalOpen} onClose={handleCloseModal} />
    </UserProfileSettingStyle>
  );
};

const UserProfileSettingStyle = styled.div``;

export default UserProfileSettingWidget;
