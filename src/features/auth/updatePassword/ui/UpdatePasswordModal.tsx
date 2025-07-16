import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { isValidationError } from 'shared/types/CustomErrorResponse';
import { InputText, Modal } from 'shared/ui';
import { setErrorFromServer } from 'shared/validation/setErrorFromServer';
import { toast } from 'sonner';
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
    setError,
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const { mutate } = useUpdatePassword({
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다!');
    },
    onError: (error) => {
      console.error('비밀번호 변경 실패:', error.response?.data);

      if (isValidationError(error)) {
        // 백엔드에서 받은 유효성 에러를 폼에 띄움
        setErrorFromServer<UpdatePasswordFormValues>(error, setError);
      } else {
        // 일반적인 에러 처리
        const message =
          error.response?.data?.message || '비밀번호를 변경하지 못했어요.';
        toast.error(message as string);
      }
    },
  });

  const onSubmit = (data: UpdatePasswordFormValues) => {
    console.log('제출된 값:', data);
    mutate(data);
    onClose();
  };

  return (
    <UpdatePasswordModalStyle>
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
              placeholder="새 비밀번호를 한 번 더 입력해주세요"
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
