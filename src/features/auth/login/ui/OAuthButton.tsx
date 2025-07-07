import { AuthProvider } from 'entities/auth/model';
import { hoverOverlay } from 'shared/styles/hoverOverlay';
import styled from 'styled-components';

interface OAuthButtonProps {
  provider: AuthProvider;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const OAuthButton = ({ provider, icon, onClick }: OAuthButtonProps) => {
  return (
    <StyledButton className={provider} onClick={onClick}>
      {icon}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);

  ${hoverOverlay}

  &.google {
    background: #fff;

  }

  &.kakao {
    background: #fee500;
    color: #000;
  }
`;
