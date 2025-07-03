import { Eye, EyeOff } from 'lucide-react';
import React, { forwardRef, useState } from 'react';
import { useTheme } from 'styled-components';
import {
  ErrorMsg,
  InputWrapper,
  Label,
  RequiredMark,
  StyledInput,
  StyledTextArea,
  ToggleButton,
  Wrapper,
} from './InputText.style';

type InputType = 'text' | 'email' | 'password' | 'textarea' | 'tel';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  required?: boolean;
  type?: InputType;
}

export const InputText = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputTextProps
>(({ label, name, error, required, type = 'text', ...rest }, ref) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isTextArea = type === 'textarea';
  const inputType = isPassword && showPassword ? 'text' : type;
  const handleToggle = () => setShowPassword((prev) => !prev);

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
});
