import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 600;
`;

export const RequiredMark = styled.span`
  margin-left: 0.25rem;
  color: ${({ theme }) => theme.color.errorText};
`;

export const InputWrapper = styled.div`
  margin-top: 8px;
  position: relative;
  width: 100%;
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const ErrorMsg = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xsmall};
  color: ${({ theme }) => theme.color.errorText};
  margin-left: 0.5rem;
`;

const baseStyle = css<{ $hasError: boolean }>`
  width: 100%;
  padding: 1rem 1.25rem;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: 1.5;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.color.subBackground};
  border: ${({ $hasError, theme }) =>
    $hasError ? `1px solid ${theme.color.errorText}` : 'none'};

  &::placeholder {
    color: ${({ theme }) => theme.color.thirdText};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.primary};
  }

  &:-webkit-autofill {
  box-shadow: 0 0 0px 1000px ${({ theme }) => theme.color.subBackground} inset;
  -webkit-text-fill-color: ${({ theme }) => theme.color.hoverOverlay};
  transition: background-color 9999s ease-in-out 0s;
}

  transition: box-shadow 0.2s;
`;

export const StyledInput = styled.input<{ $hasError: boolean }>`
  ${baseStyle}
`;

export const StyledTextArea = styled.textarea<{ $hasError: boolean }>`
  ${baseStyle}
  margin-top: 8px;
  min-height: 120px;
`;
