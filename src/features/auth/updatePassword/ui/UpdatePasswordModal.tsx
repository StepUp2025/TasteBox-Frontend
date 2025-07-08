import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputText, Modal } from 'shared/ui';
import styled from 'styled-components';
import { useUpdatePassword } from '../hooks/useUpdatePassword';
import {
  UpdatePasswordFormValues,
  updatePasswordSchema,
} from '../validation/updatePasswordSchema';

interface UpdatePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const UpdatePasswordModal = ({ open, onClose }: UpdatePasswordModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const { mutate, isPending } = useUpdatePassword();

  const onSubmit = (data: UpdatePasswordFormValues) => {
    console.log('제출된 값:', data);
    mutate(data);
    onClose();
  };

  return (
    <UpdatePasswordModalStyle>
      <h1>UpdatePasswordModal</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          open={open}
          onClose={onClose}
          title="비밀번호 변경"
          onConfirm={() => onSubmit}
          confirmText="변경하기"
          confirmType="submit"
        >
          <div className="input-group">
            <InputText
              label="현재 비밀번호"
              placeholder="현재 비밀번호를 입력해주세요"
              {...register('currentPassword')}
              error={errors.currentPassword?.message}
              type="password"
            />
            <InputText
              label="새 비밀번호"
              placeholder="새 비밀번호를 입력해주세요"
              {...register('newPassword')}
              error={errors.newPassword?.message}
              type="password"
            />
            <InputText
              label="새 비밀번호 확인"
              placeholder="새 비밀번호를 한번 더 입력해주세요"
              {...register('newPasswordConfirm')}
              error={errors.newPasswordConfirm?.message}
              type="password"
            />
          </div>
        </Modal>
      </form>
    </UpdatePasswordModalStyle>
  );
};

const UpdatePasswordModalStyle = styled.div`
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 12px; 
    margin-top: 12px;

  }
`;

export default UpdatePasswordModal;
