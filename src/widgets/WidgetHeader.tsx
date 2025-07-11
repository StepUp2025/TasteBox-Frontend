import { Link } from 'react-router-dom';
import { Title } from 'shared/ui';
import styled from 'styled-components';

interface WidgetHeaderProps {
  title: string;
  linkTo: string;
  linkText: string;
}

const WidgetHeader = ({ title, linkTo, linkText }: WidgetHeaderProps) => {
  return (
    <WidgetHeaderStyle>
      <Title size="medium">{title}</Title>
      <Link to={linkTo} state={{ from: '/mypage' }}>
        {linkText}
      </Link>
    </WidgetHeaderStyle>
  );
};

const WidgetHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 16px;
  width: 800px;

  a {
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.color.thirdText};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default WidgetHeader;
