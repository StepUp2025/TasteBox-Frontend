import { Plus } from 'lucide-react';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import defaultUserProfileImage from 'shared/assets/images/default-user-profile-image.png';
import {
  FileUploadButton,
  FileUploadWrapper,
  HiddenInput,
  PreviewImage,
} from './style/UserProfileImage.style';

interface UserProfileImageProps {
  name: string;
  previewImageUrl?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserProfileImage = forwardRef<HTMLInputElement, UserProfileImageProps>(
  ({ name, previewImageUrl, onChange }, ref) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
      previewImageUrl ?? null,
    );

    useImperativeHandle(ref, () => fileRef.current as HTMLInputElement, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
      onChange?.(e);
    };

    const handleFileClick = () => {
      fileRef.current?.click();
    };

    return (
      <div>
        <FileUploadWrapper $hasImage={!!previewUrl} onClick={handleFileClick}>
          <HiddenInput
            ref={fileRef}
            id={name}
            name={name}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <FileUploadButton type="button" onClick={handleFileClick}>
            <Plus />
          </FileUploadButton>

          {previewUrl ? (
            <PreviewImage src={previewUrl} alt="미리보기 이미지" />
          ) : (
            <img src={defaultUserProfileImage} alt="user-profile-image" />
          )}
        </FileUploadWrapper>
      </div>
    );
  },
);

export default UserProfileImage;
