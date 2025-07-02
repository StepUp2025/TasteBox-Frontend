import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Empty() {
  return (
    <StyledEmpty>
      <Text>
        취향 설정을 해주세요.
        <StyledLink to="/preferences">바로가기</StyledLink>
      </Text>
    </StyledEmpty>
  );
}

const StyledEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

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
