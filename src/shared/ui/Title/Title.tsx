import { HTMLAttributes, JSX, ReactNode } from 'react';
import { ColorKey, FontSizeKey } from 'shared/types/theme';
import styled from 'styled-components';

interface TitleProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  size: FontSizeKey;
  color: ColorKey;
  as?: keyof JSX.IntrinsicElements;
}

const StyledTitle = styled.span<Omit<TitleProps, 'children'>>`
  font-weight: bold;
  font-size: ${({ theme, size = 'large' }) => theme.fontSize[size]};
`;

export default function Title({
  children,
  size = 'large',
  color,
  as = 'span',
  ...rest
}: TitleProps) {
  return (
    <StyledTitle as={as} size={size} color={color} {...rest}>
      {children}
    </StyledTitle>
  );
}
