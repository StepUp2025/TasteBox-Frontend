import { useAuthStore } from 'entities/auth/model/store/authStore';
import { useThemeStore } from 'entities/theme/model/store/themeStore';
import {
  Clapperboard,
  Folder,
  LogIn,
  LogOut,
  Moon,
  PackageOpen,
  Sun,
  Tv,
  User,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui';
import styled, { useTheme } from 'styled-components';

interface LabelProps {
  $active?: boolean;
}

export default function Sidebar() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const resetAccessToken = useAuthStore((state) => state.resetAccessToken);
  const themeMode = useThemeStore((state) => state.theme);
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
          <PackageOpen
            size={24}
            stroke={theme.color.constantWhite}
            style={{ display: 'block', margin: 'auto' }}
          />
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
            <MenuContent $width={60}>
              <Clapperboard
                size={24}
                stroke={
                  isActive('/movie')
                    ? theme.color.hoverOverlay
                    : theme.color.thirdText
                }
              />

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
            <MenuContent $width={60}>
              <Tv
                size={24}
                stroke={
                  isActive('/tv')
                    ? theme.color.hoverOverlay
                    : theme.color.thirdText
                }
              />

              <Label $active={isActive('/tv')}>TV 시리즈</Label>
            </MenuContent>
          </Button>
          <Button
            onClick={() => {
              if (!isLoggedIn) {
                navigate('/login');
              } else {
                navigate('/collection');
              }
            }}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
            $active={isActive('/collection')}
          >
            <MenuContent $width={60}>
              <Folder
                size={24}
                stroke={
                  isActive('/collection')
                    ? theme.color.hoverOverlay
                    : theme.color.thirdText
                }
              />

              <Label $active={isActive('/collection')}>컬렉션</Label>
            </MenuContent>
          </Button>

          <Button
            onClick={() => {
              if (!isLoggedIn) {
                navigate('/login');
              } else {
                navigate('/mypage');
              }
            }}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
            $active={isActive('/mypage')}
          >
            <MenuContent $width={60}>
              <User
                size={24}
                stroke={
                  isActive('/mypage')
                    ? theme.color.hoverOverlay
                    : theme.color.thirdText
                }
              />
              <Label $active={isActive('/mypage')}>마이페이지</Label>
            </MenuContent>
          </Button>
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
            <MenuContent $width={60}>
              <LogOut size={24} stroke={theme.color.thirdText} />
            </MenuContent>
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/login')}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
          >
            <MenuContent $width={60}>
              <LogIn size={24} width={60} stroke={theme.color.thirdText} />
            </MenuContent>
          </Button>
        )}

        <Button
          onClick={toggleTheme}
          buttonSize="menuNarrow"
          fontSize="small"
          scheme="menu"
          borderRadius="medium"
        >
          <MenuContent $width={60}>
            {themeMode === 'light' ? (
              <Moon size={24} stroke={theme.color.thirdText} />
            ) : (
              <Sun size={24} stroke={theme.color.thirdText} />
            )}
          </MenuContent>
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
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    box-shadow: ${({ theme }) => theme.shadow.default};
  `;

const Top = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 12px;
    padding: 8px;
  `;

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    margin-top: 32px;
  `;

const MenuContent = styled.span<{ $width?: number; $active?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
    height: 100%;
    button:hover & svg {
      stroke: ${({ theme }) => theme.color.hoverOverlay};
    }
    button:hover & span {
      color: ${({ theme }) => theme.color.hoverOverlay};
      font-weight: bold;
    }
     `;

const Label = styled.span<LabelProps>`
    margin-top: 4px;
    font-size: 12px;
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
