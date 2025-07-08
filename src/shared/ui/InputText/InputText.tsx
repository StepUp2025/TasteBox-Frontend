import { Eye, EyeOff, Plus } from 'lucide-react';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useTheme } from 'styled-components';
import {
  ErrorMsg,
  FileUploadButton,
  FileUploadWrapper,
  FormDescription,
  HiddenInput,
  InputWrapper,
  Label,
  PreviewImage,
  RequiredMark,
  StyledInput,
  StyledTextArea,
  ToggleButton,
  Wrapper,
} from './InputText.style';

type InputType = 'text' | 'email' | 'password' | 'textarea' | 'tel' | 'file';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  required?: boolean;
  type?: InputType;
  previewImageUrl?: string;
}

export const InputText = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputTextProps
>(
  (
    { label, name, error, required, type = 'text', previewImageUrl, ...rest },
    ref,
  ) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
      previewImageUrl ?? null,
    );
    const fileRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => fileRef.current as HTMLInputElement, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    };

    const isPassword = type === 'password';
    const isTextArea = type === 'textarea';
    const isFile = type === 'file';
    const inputType = isPassword && showPassword ? 'text' : type;

    const handleToggle = () => setShowPassword((prev) => !prev);

    const handleFileClick = () => {
      fileRef.current?.click();
    };

    return (
      <Wrapper>
        {label && (
          <Label htmlFor={name}>
            {label}
            {required && <RequiredMark>*</RequiredMark>}
          </Label>
        )}

        {isTextArea ? (
          <StyledTextArea
            id={name}
            name={name}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            $hasError={!!error}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : isFile ? (
          <FileUploadWrapper hasImage={!!previewUrl}>
            <HiddenInput
              ref={fileRef}
              id={name}
              name={name}
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e);
                rest.onChange?.(e);
              }}
            />

            <FileUploadButton type="button" onClick={handleFileClick}>
              <Plus />
            </FileUploadButton>
            {previewUrl && (
              <PreviewImage src={previewUrl} alt="미리보기 이미지" />
            )}

            {!previewUrl && (
              <FormDescription>
                설정하지 않으면 랜덤 기본 이미지로 설정됩니다.
              </FormDescription>
            )}
          </FileUploadWrapper>
        ) : (
          <InputWrapper>
            <StyledInput
              id={name}
              name={name}
              type={inputType}
              ref={ref as React.Ref<HTMLInputElement>}
              $hasError={!!error}
              {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
            />
            {isPassword && (
              <ToggleButton type="button" onClick={handleToggle}>
                {showPassword ? (
                  <Eye size={20} color={theme.color.thirdText} />
                ) : (
                  <EyeOff size={20} color={theme.color.thirdText} />
                )}
              </ToggleButton>
            )}
          </InputWrapper>
        )}

        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Wrapper>
    );
  },
);
