import { useAuthStore } from 'entities/auth/model/store/authStore';
import { useThemeStore } from 'entities/theme/model/store/themeStore';
import {
  Clapperboard,
  Folder,
  LogIn,
  LogOut,
  PackageOpen,
  Sun,
  Tv,
  User,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, IconPreset } from 'shared/ui';
import styled, { useTheme } from 'styled-components';

interface LabelProps {
  $active?: boolean;
}

export default function Sidebar() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const resetAccessToken = useAuthStore((state) => state.resetAccessToken);
  const { toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    resetAccessToken();
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const theme = useTheme();

  return (
    <SidebarWrapper>
      <Top>
        <Button
          onClick={() => navigate('/')}
          buttonSize="menuNarrow"
          fontSize="large"
          scheme="primary"
          borderRadius="medium"
        >
          <IconPreset width={24} color={'constantWhite'}>
            <PackageOpen />
          </IconPreset>
        </Button>
        <Nav>
          <Button
            onClick={() => navigate('/movie')}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
            $active={isActive('/movie')}
          >
            <MenuContent>
              <IconPreset width={24} color={'thirdText'}>
                <Clapperboard
                  stroke={
                    isActive('/movie')
                      ? theme.color.hoverOverlay
                      : theme.color.thirdText
                  }
                />
              </IconPreset>

              <Label $active={isActive('/movie')}>영화</Label>
            </MenuContent>
          </Button>
          <Button
            onClick={() => navigate('/tv')}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
            $active={isActive('/tv')}
          >
            <MenuContent>
              <IconPreset width={24} color={'thirdText'}>
                <Tv
                  stroke={
                    isActive('/tv')
                      ? theme.color.hoverOverlay
                      : theme.color.thirdText
                  }
                />
              </IconPreset>

              <Label $active={isActive('/tv')}>TV 시리즈</Label>
            </MenuContent>
          </Button>
          {isLoggedIn && (
            <>
              <Button
                onClick={() => navigate('/collection')}
                buttonSize="menuNarrow"
                fontSize="small"
                scheme="menu"
                borderRadius="medium"
                $active={isActive('/collection')}
              >
                <MenuContent>
                  <IconPreset width={24} color={'thirdText'}>
                    <Folder
                      stroke={
                        isActive('/collection')
                          ? theme.color.hoverOverlay
                          : theme.color.thirdText
                      }
                    />
                  </IconPreset>

                  <Label $active={isActive('/collection')}>컬렉션</Label>
                </MenuContent>
              </Button>

              <Button
                onClick={() => navigate('/mypage')}
                buttonSize="menuNarrow"
                fontSize="small"
                scheme="menu"
                borderRadius="medium"
                $active={isActive('/mypage')}
              >
                <MenuContent>
                  <IconPreset width={24} color={'thirdText'}>
                    <User
                      stroke={
                        isActive('/mypage')
                          ? theme.color.hoverOverlay
                          : theme.color.thirdText
                      }
                    />
                  </IconPreset>
                  <Label $active={isActive('/mypage')}>마이페이지</Label>
                </MenuContent>
              </Button>
            </>
          )}
        </Nav>
      </Top>

      <Bottom>
        {isLoggedIn ? (
          <Button
            onClick={handleLogout}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
          >
            <IconPreset width={24} color={'thirdText'}>
              <LogOut stroke={theme.color.thirdText} />
            </IconPreset>
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/login')}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
          >
            <IconPreset width={24} color={'thirdText'}>
              <LogIn stroke={theme.color.thirdText} />
            </IconPreset>
          </Button>
        )}

        <Button
          onClick={toggleTheme}
          buttonSize="menuNarrow"
          fontSize="small"
          scheme="menu"
          borderRadius="medium"
        >
          <IconPreset width={24} color={'thirdText'}>
            <Sun stroke={theme.color.thirdText} />
          </IconPreset>
        </Button>
      </Bottom>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.aside`
  width: auto;
  height: 100vh;
  background: ${({ theme }) => theme.color.basicBackground};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.color.border};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  margin-top: 32px;
`;

const MenuContent = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  button:hover & svg {
    stroke: ${({ theme }) => theme.color.hoverOverlay};
  }
`;

const Label = styled.span<LabelProps>`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.fontSize.xsmall};
  color: ${({ $active, theme }) => ($active ? theme.color.hoverOverlay : theme.color.thirdText)};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  text-align: center;
  width: 100%;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin-bottom: 24px;
  padding: 15px;
`;
