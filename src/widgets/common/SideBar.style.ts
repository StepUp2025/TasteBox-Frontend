import { NavLink } from 'react-router-dom';
import {
  SIDEBAR_WIDTH,
  TABLE_SIDEBAR_WIDTH,
} from 'shared/constants/mediaQuery';
import { hoverOverlay } from 'shared/styles/hoverOverlay';
import { Button } from 'shared/ui';
import styled from 'styled-components';

export const SidebarWrapper = styled.nav`
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

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  `;

export const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
  `;

export const IconLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
  border-radius: ${({ theme }) => theme.borderRadius.medium};


  svg {
    stroke: ${({ theme }) => theme.color.thirdText};
          width: 20px;
      height: 20px;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      width: 16px;
      height: 16px;
    }
  }

  &.active {
    background-color: ${({ theme }) => theme.color.subBackground};
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

export const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 12px;
  color: ${({ theme }) => theme.color.thirdText};
  font-weight: 500;
    @media ${({ theme }) => theme.mediaQuery.tablet} {
        font-size: 10px;    
    }
`;

export const Logo = styled(NavLink)`
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

export const LogInLink = styled(NavLink)`
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

export const LogOutInLink = styled(NavLink)`
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

export const ThemeButton = styled(Button)`
  padding: 1rem;

  svg {
    stroke: ${({ theme }) => theme.color.thirdText};
  }
`;
