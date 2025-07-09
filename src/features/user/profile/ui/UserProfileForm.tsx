import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileUpdateType } from 'entities/user/model';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button, InputText } from 'shared/ui';
import styled from 'styled-components';
import { useGetUserProfile } from '../hooks/useGetUserProfile';
import { useUpdateUserProfile } from '../hooks/useUpdateUserProfile';
import {
  UserProfileFormValues,
  userProfileSchema,
} from '../validation/userProfileSchema';
import UserProfileImage from './UserProfileImage';

const UserProfileForm = () => {
  const { data } = useGetUserProfile();
  const { mutate, isPending } = useUpdateUserProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      nickname: data?.nickname || '',
      phone: '',
    },
  });

  useEffect(() => {
    if (!data) return;

    reset({
      nickname: data.nickname ?? '',
      phone: data.provider === 'local' ? (data.contact ?? '') : '',
    });
  }, [data, reset]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  if (!data) {
    //데이터 바로 할당하기 위한 임시 로딩, 로딩 컴포넌트 작성되면 통일하겠음
    return <div>로딩 중...</div>;
  }

  const { nickname, image, provider } = data;

  const onSubmit = (data: UserProfileFormValues) => {
    console.log('data 값:', data);

    const imageFile = imageInputRef.current?.files?.[0];
    const payload: ProfileUpdateType = {
      nickname: data.nickname,
      contact: data.phone,
      image: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };

    console.log('payload 값:', payload);

    mutate(payload);
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
          {provider === 'local' && (
            <InputText
              label="전화번호"
              placeholder="전화번호를 입력해주세요"
              {...register('phone')}
              error={errors.phone?.message}
            />
          )}
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


  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px; // 버튼과 input-group 사이 여유
    min-width: 520px;
    margin-bottom: 16px;
    
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 32px; 
    min-width: 520px;
  }
`;

export default UserProfileForm;
