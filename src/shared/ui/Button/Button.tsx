import { ButtonHTMLAttributes, ReactNode } from 'react';
import { hoverOverlay } from 'shared/styles/hoverOverlay';
import {
  BorderRadiusKey,
  ButtonScheme,
  ButtonSize,
  FontSizeKey,
} from 'shared/types/theme';
import styled from 'styled-components';

type ActiveScheme = 'menu' | 'genre';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonSize: ButtonSize;
  fontSize: FontSizeKey;
  scheme: ButtonScheme;
  borderRadius: BorderRadiusKey;
  disableHoverOverlay?: boolean;
  activeScheme?: ActiveScheme;
}

const Button = ({
  children,
  buttonSize,
  fontSize,
  scheme,
  borderRadius,
  disableHoverOverlay = false,
  onClick,
  type = 'button',
  className,
}: Props) => {
  return (
    <ButtonStyle
      buttonSize={buttonSize}
      fontSize={fontSize}
      scheme={scheme}
      borderRadius={borderRadius}
      onClick={onClick}
      type={type}
      disableHoverOverlay={disableHoverOverlay}
      className={className}
    >
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'scheme',
      'buttonSize',
      'fontSize',
      'borderRadius',
      'disableHoverOverlay',
      '$active',
    ].includes(prop),
})<Omit<Props, 'children'>>`
  font-size: ${({ theme, buttonSize, fontSize }) => (theme.buttonSize[buttonSize].fontSize ? theme.buttonSize[buttonSize].fontSize : theme.fontSize[fontSize])};
  padding: ${({ theme, buttonSize }) => theme.buttonSize[buttonSize].padding};
  width: ${({ theme, buttonSize }) => (theme.buttonSize[buttonSize].width ? theme.buttonSize[buttonSize].width : 'auto')};
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) =>
    theme.buttonScheme[scheme].backgroundColor};
  font-weight: 'normal';
  border-radius: ${({ theme, borderRadius }) =>
    theme.borderRadius[borderRadius]};
  border: ${({ theme, scheme }) =>
    theme.buttonScheme[scheme].border
      ? `1px solid ${theme.buttonScheme[scheme].border}`
      : 'none'};
    line-height: 1;

  ${({ disableHoverOverlay }) => !disableHoverOverlay && hoverOverlay}
`;

export default Button;
