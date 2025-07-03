import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface EmptyProps {
  text: string;
  linkText: string;
  linkTo: string;
}

export function Empty({
  text = '취향 설정을 해주세요.',
  linkText = '바로가기',
  linkTo = '/preferences',
}: EmptyProps) {
  return (
    <StyledEmpty>
      <Text>
        {text}
        <StyledLink to={linkTo}>{linkText}</StyledLink>
      </Text>
    </StyledEmpty>
  );
}

const StyledEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;`;

const Text = styled.span`
  color: ${({ theme }) => theme.color.thirdText};
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.highlightText};
  font-weight: bold;
  padding-left: 12px;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;
