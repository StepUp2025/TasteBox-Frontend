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
  User,
} from 'lucide-react';
import {
  Bottom,
  IconLink,
  IconTextWrapper,
  LogInLink,
  LogOutInLink,
  Logo,
  SidebarWrapper,
  ThemeButton,
  Top,
} from './SideBar.style';

export default function Sidebar() {
  const { mutate: logoutMutate } = useLogout();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const themeMode = useThemeStore((state) => state.theme);
  const { toggleTheme } = useThemeStore();
  const handleLogout = () => {
    logoutMutate();
  };

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
        <IconLink to={isLoggedIn ? '/mypage' : '/login'}>
          <IconTextWrapper>
            <User />내 정보
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
          {themeMode === 'light' ? <Moon /> : <Sun />}
        </ThemeButton>
      </Bottom>
    </SidebarWrapper>
  );
}
