// src/app/Layout.tsx
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from 'widgets/Footer';
import Sidebar from 'widgets/SideBar';

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

const SIDEBAR_WIDTH = 106;

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
