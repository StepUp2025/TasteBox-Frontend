// src/app/Layout.tsx
import { Outlet } from 'react-router-dom';
import {
  SIDEBAR_WIDTH,
  TABLE_SIDEBAR_WIDTH,
} from 'shared/constants/mediaQuery';

import styled from 'styled-components';
import Footer from 'widgets/common/Footer';
import Sidebar from 'widgets/common/SideBar';

export default function Layout() {
  return (
    <Wrapper>
      <Sidebar />
      <MainWrapper>
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </MainWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

const MainWrapper = styled.main`
  margin-left: ${SIDEBAR_WIDTH}px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%; 

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-left: ${TABLE_SIDEBAR_WIDTH}px;
  }
`;

const Container = styled.section`
  width: 100%;
  max-width: 1280px;
  min-width: 280px;
  margin: 0 auto;
  padding: 3rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
