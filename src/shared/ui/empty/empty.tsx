import { Link, To } from 'react-router-dom';
import styled from 'styled-components';

interface EmptyProps {
  text: string;
  linkText?: string;
  linkTo?: To;
  state?: Record<string, unknown>;
}

export function Empty({ text, linkText, linkTo, state }: EmptyProps) {
  return (
    <StyledEmpty>
      <Text>
        {text}
        {linkTo && linkText && (
          <StyledLink to={linkTo} state={state}>
            {linkText}
          </StyledLink>
        )}
      </Text>
    </StyledEmpty>
  );
}

const StyledEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 300px;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.color.thirdText};
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.highlightText};
  font-weight: bold;
  text-decoration: underline;
  padding-left: 12px;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;
