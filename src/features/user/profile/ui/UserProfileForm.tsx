import { zodResolver } from '@hookform/resolvers/zod';
import { LocalUser, OAuthUser } from 'entities/user/model';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { isValidationError } from 'shared/types/CustomErrorResponse';
import { Button, InputText } from 'shared/ui';
import { setErrorFromServer } from 'shared/validation/setErrorFromServer';
import { toast } from 'sonner';
import styled from 'styled-components';
import { useUpdateUserProfile } from '../hooks/useUpdateUserProfile';
import {
  UserProfileFormValues,
  userProfileSchema,
} from '../validation/userProfileSchema';
import UserProfileImage from './UserProfileImage';

interface Props {
  user: LocalUser | OAuthUser;
}

const UserProfileForm = ({ user }: Props) => {
  const { mutate, isPending } = useUpdateUserProfile({
    onSuccess: () => {
      toast.success('프로필이 수정되었습니다!');
    },
    onError: (error) => {
      console.error('프로필 수정 실패:', error.response?.data);

      if (isValidationError(error)) {
        // 백엔드에서 받은 유효성 에러를 폼에 띄움
        setErrorFromServer<UserProfileFormValues>(error, setError);
      } else {
        // 일반적인 에러 처리
        const message =
          error.response?.data?.message || '프로필을 수정하지 못했어요.';
        toast.error(message as string);
      }
    },
  });
  const { nickname, image } = user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      nickname: nickname || '',
      contact: '',
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      nickname: user.nickname ?? '',
      contact: user.contact ?? '',
    });
  }, [user, reset]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (data: UserProfileFormValues) => {
    const formData = new FormData();
    formData.append('nickname', data.nickname);
    formData.append('contact', data.contact ?? '');
    const imageFile = imageInputRef.current?.files?.[0];
    if (imageFile) {
      formData.append('image', imageFile);
    }

    mutate(formData);
  };

  return (
    <UserProfileFormStyle>
      <UserProfileImage
        name={nickname}
        previewImageUrl={image}
        ref={imageInputRef} // 이미지 컴포넌트에 업로드된 이미지 값 참조.
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <InputText
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            {...register('nickname')}
            error={errors.nickname?.message}
          />

          <InputText
            label="전화번호"
            placeholder="전화번호를 입력해주세요"
            {...register('contact')}
            error={errors.contact?.message}
          />
        </div>
        <Button
          buttonSize="large"
          fontSize="xsmall"
          scheme="primary"
          type="submit"
          borderRadius="medium"
          disabled={isPending}
        >
          프로필 수정
        </Button>
      </form>
    </UserProfileFormStyle>
  );
};

const UserProfileFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;       // 가로 정렬
  justify-content: center;   // 세로 정렬
  width: 100%;


  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px; // 버튼과 input-group 사이 여유
    width: 100%;
    max-width: 520px;
    margin-bottom: 16px;
    
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%; 
    max-width: 520px;
  }
`;

export default UserProfileForm;
