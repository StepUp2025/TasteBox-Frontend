import { ButtonHTMLAttributes, ReactNode } from 'react';
import { hoverOverlay } from 'shared/styles/hoverOverlay';
import {
  BorderRadiusKey,
  ButtonScheme,
  ButtonSize,
  FontSizeKey,
} from 'shared/types/theme';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonSize: ButtonSize;
  fontSize: FontSizeKey;
  scheme: ButtonScheme;
  borderRadius: BorderRadiusKey;
}

const Button = ({
  children,
  buttonSize,
  fontSize,
  scheme,
  borderRadius,
  onClick,
}: Props) => {
  return (
    <ButtonStyle
      buttonSize={buttonSize}
      fontSize={fontSize}
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
    !['scheme', 'buttonSize', 'fontSize', 'borderRadius'].includes(prop),
})<Omit<Props, 'children'>>`
  font-size: ${({ theme, buttonSize, fontSize }) => (theme.buttonSize[buttonSize].fontSize ? theme.buttonSize[buttonSize].fontSize : theme.fontSize[fontSize])};
  padding: ${({ theme, buttonSize }) => theme.buttonSize[buttonSize].padding};
  width: ${({ theme, buttonSize }) => (theme.buttonSize[buttonSize].width ? theme.buttonSize[buttonSize].width : 'auto')};

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
