import { useAuthStore } from 'entities/auth/model/store/authStore';
import { useThemeStore } from 'entities/theme/model/store/themeStore';
import { useLogout } from 'features/auth/logout/hooks/useLogout';
import {
  Clapperboard,
  Folder,
  House,
  LogIn,
  LogOut,
  Moon,
  PackageOpen,
  Sun,
  Tv,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  SIDEBAR_WIDTH,
  TABLE_SIDEBAR_WIDTH,
} from 'shared/constants/mediaquery';
import { hoverOverlay } from 'shared/styles/hoverOverlay';
import { Button } from 'shared/ui';
import styled, { useTheme } from 'styled-components';

export default function Sidebar() {
  const { mutate: logoutMutate } = useLogout();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const themeMode = useThemeStore((state) => state.theme);
  const { toggleTheme } = useThemeStore();
  const handleLogout = () => {
    logoutMutate();
  };
  const theme = useTheme();

  return (
    <SidebarWrapper>
      <Top>
        <Logo to={'/'}>
          <PackageOpen />
        </Logo>
        <IconLink to={'/'}>
          <IconTextWrapper>
            <House />홈
          </IconTextWrapper>
        </IconLink>
        <IconLink to={'/movie'}>
          <IconTextWrapper>
            <Clapperboard />
            영화
          </IconTextWrapper>
        </IconLink>
        <IconLink to={'/tv'}>
          <IconTextWrapper>
            <Tv />
            TV
          </IconTextWrapper>
        </IconLink>
        <IconLink to={isLoggedIn ? '/collection' : '/login'}>
          <IconTextWrapper>
            <Folder />
            컬렉션
          </IconTextWrapper>
        </IconLink>
      </Top>

      <Bottom>
        {isLoggedIn ? (
          <LogOutInLink to={'/'} onClick={handleLogout}>
            <IconTextWrapper>
              <LogOut size={20} />
              로그아웃
            </IconTextWrapper>
          </LogOutInLink>
        ) : (
          <LogInLink to={'/login'}>
            <IconTextWrapper>
              <LogIn size={20} />
              로그인
            </IconTextWrapper>
          </LogInLink>
        )}
        <ThemeButton
          onClick={toggleTheme}
          buttonSize="menuNarrow"
          fontSize="small"
          scheme="menu"
          borderRadius="medium"
        >
          {themeMode === 'light' ? (
            <Moon stroke={theme.color.thirdText} />
          ) : (
            <Sun stroke={theme.color.thirdText} />
          )}
        </ThemeButton>
      </Bottom>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.nav`
  width: ${SIDEBAR_WIDTH}px;
  height: 100vh;
  padding: 2rem 0;
  background: ${({ theme }) => theme.color.basicBackground};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.shadow.default};

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      width: ${TABLE_SIDEBAR_WIDTH}px;
    }
  `;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  `;

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
  `;

const IconLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
  border-radius: ${({ theme }) => theme.borderRadius.medium};


  svg {
    stroke: ${({ theme }) => theme.color.thirdText};

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      width: 20px;
      height: 20px;
    }
  }

  &.active {
    div {
    color: ${({ theme }) => theme.color.defaultText};
    font-weight: 700;

    }

    svg {
      stroke: ${({ theme }) => theme.color.defaultText};
    }
  }

  &:hover {
    background: ${({ theme }) => theme.color.subBackground};
  }
`;

const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 12px;
  color: ${({ theme }) => theme.color.thirdText};
  font-weight: 500;
`;

const Logo = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.color.primary};
  margin-bottom: 1rem;

  svg {
    stroke: ${({ theme }) => theme.color.constantWhite};
  }
  `;

const LogInLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.color.subBackground};

  div {
    color: ${({ theme }) => theme.color.highlightText};
    font-size: 10px;
  }

  svg {
    stroke: ${({ theme }) => theme.color.highlightText};
  }
`;

const LogOutInLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};

  div {
    font-size: 10px;
  }

  svg {
    stroke: ${({ theme }) => theme.color.thirdText};
  }

  ${hoverOverlay}
  `;

const ThemeButton = styled(Button)`
  padding: 1rem;
`;
