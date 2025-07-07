import { useThemeStore } from 'entities/theme/model/store/themeStore';
import {
  Clapperboard,
  Folder,
  LogIn,
  PackageOpen,
  Sun,
  Tv,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, IconPreset } from 'shared/ui';
import styled from 'styled-components';

export default function Sidebar() {
  const { toggleTheme } = useThemeStore();
  const navigate = useNavigate();

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
          <IconPreset width={32} color={'constantWhite'}>
            <PackageOpen width={24} />
          </IconPreset>
        </Button>
        <Nav>
          <Button
            onClick={() => navigate('/movie')}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
          >
            <MenuContent>
              <Clapperboard size={24} />
              <Label>영화</Label>
            </MenuContent>
          </Button>
          <Button
            onClick={() => navigate('/tv')}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
          >
            <MenuContent>
              <Tv size={24} />
              <Label>TV 시리즈</Label>
            </MenuContent>
          </Button>
          <Button
            onClick={() => navigate('/collection')}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
          >
            <MenuContent>
              <Folder size={24} />
              <Label>컬렉션</Label>
            </MenuContent>
          </Button>
          <Button
            onClick={() => navigate('/mypage')}
            buttonSize="menuNarrow"
            fontSize="small"
            scheme="menu"
            borderRadius="medium"
          >
            <MenuContent>
              <User size={24} />
              <Label>마이페이지</Label>
            </MenuContent>
          </Button>
        </Nav>
      </Top>

      <Bottom>
        <Button
          onClick={() => navigate('/login')}
          buttonSize="menuNarrow"
          fontSize="small"
          scheme="menu"
          borderRadius="medium"
        >
          <LogIn size={22} />
        </Button>

        <Button
          onClick={toggleTheme}
          buttonSize="menuNarrow"
          fontSize="small"
          scheme="menu"
          borderRadius="medium"
        >
          <Sun size={22} />
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
`;

const Label = styled.span`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.fontSize.xsmall};
  color: ${({ theme }) => theme.color.secondText};
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
