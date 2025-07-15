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
import { ButtonScheme } from 'shared/types/theme';
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
        <Logo onClick={() => navigate('/')}>
          <PackageOpen size={24} />
        </Logo>
        <Nav>
          <MenuButton
            onClick={() => navigate('/movie')}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
            $active={isActive('/movie')}
            disableHoverOverlay={true}
          >
            <MenuContent $width={60} $active={isActive('/movie')}>
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
          </MenuButton>
          <MenuButton
            onClick={() => navigate('/tv')}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
            $active={isActive('/tv')}
            disableHoverOverlay={true}
          >
            <MenuContent $width={60} $active={isActive('/tv')}>
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
          </MenuButton>
          <MenuButton
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
            disableHoverOverlay={true}
          >
            <MenuContent $width={60} $active={isActive('/collection')}>
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
          </MenuButton>

          <MenuButton
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
            disableHoverOverlay={true}
          >
            <MenuContent $width={60} $active={isActive('/mypage')}>
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
          </MenuButton>
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
            disableHoverOverlay={true}
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
            disableHoverOverlay={true}
          >
            <MenuContent $width={60}>
              <LogIn size={24} stroke={theme.color.thirdText} />
            </MenuContent>
          </Button>
        )}

        <Button
          onClick={toggleTheme}
          buttonSize="menuNarrow"
          fontSize="small"
          scheme="menu"
          borderRadius="medium"
          disableHoverOverlay={true}
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
  `;

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    margin-top: 16px;
  `;

const MenuContent = styled.span<{ $width?: number; $active?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
    height: 65px;
    border-radius:10px;
    padding: 10px 10px;
    background: ${({ $active, theme }) =>
      $active ? theme.color.subBackground : 'transparent'};
    transition: background 0.2s;
    &:hover {
    background: ${({ theme }) => theme.color.subBackground};
  }
    button:hover & svg {
      stroke: ${({ theme }) => theme.color.hoverOverlay};
    }
    button:hover & span {
      color: ${({ theme }) => theme.color.hoverOverlay};
      font-weight: bold;
    }
     `;
const Logo = styled.button`
 display: flex;
 justify-content: center;
 align-items: center;
 padding: 10px;
 border-radius: ${({ theme }) => theme.borderRadius.medium};
 background-color: ${({ theme }) => theme.color.primary};
 svg{
  stroke:  ${({ theme }) => theme.color.constantWhite};
 }
`;

const Label = styled.span<LabelProps>`
    margin-top: 4px;
    font-size: 12px;
    color: ${({ $active, theme }) => ($active ? theme.color.hoverOverlay : theme.color.thirdText)};
    font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
    text-align: center;
    width: 60px;
    `;

const MenuButton = styled(Button)<{ $active: boolean; scheme: ButtonScheme }>`
  color: ${({ $active, theme, scheme }) => ($active ? theme.buttonScheme.menuActive.color : theme.buttonScheme[scheme].color)};
  background-color: ${({ $active, theme, scheme }) =>
    $active
      ? theme.buttonScheme.menuActive.backgroundColor
      : theme.buttonScheme[scheme].backgroundColor};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
`;

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    margin-bottom: 24px;
    padding: 15px;
  `;
