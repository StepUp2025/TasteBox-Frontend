import { ButtonHTMLAttributes, ReactNode } from 'react';
import { hoverOverlay } from 'shared/styles/hoverOverlay';
import { BorderRadiusKey, ButtonScheme, ButtonSize } from 'shared/types/theme';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  borderRadius: BorderRadiusKey;
  disabled?: boolean;
  isloading?: boolean;
}

const Button = ({ children, size, scheme, borderRadius, onClick }: Props) => {
  return (
    <ButtonStyle
      size={size}
      scheme={scheme}
      borderRadius={borderRadius}
      onClick={onClick}
    >
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !['scheme', 'size', 'borderRadius', 'isloading'].includes(prop),
})<Omit<Props, 'children'>>`
  font-size: ${({ theme }) => theme.fontSize.large};
  padding: ${({ theme, size }) => theme.buttonSize[size].padding};
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) =>
    theme.buttonScheme[scheme].backgroundColor};
  border-radius: ${({ theme, borderRadius }) =>
    theme.borderRadius[borderRadius]};
  border: ${({ theme, scheme }) =>
    theme.buttonScheme[scheme].border
      ? `1px solid ${theme.buttonScheme[scheme].border}`
      : 'none'}; 
  ${hoverOverlay}
`;

export default Button;
