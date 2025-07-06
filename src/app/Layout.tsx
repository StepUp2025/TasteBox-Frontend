// src/app/Layout.tsx
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from 'widgets/Footer';
import Sidebar from 'widgets/SideBar';

export default function Layout() {
  return (
    <>
      <Sidebar />
      <MainWrapper>
        <Main>
          <Outlet /> {/* 이게 자식 라우트들 렌더링 위치 */}
        </Main>
        <Footer />
      </MainWrapper>
    </>
  );
}
x;

const SIDEBAR_WIDTH = 90;

const MainWrapper = styled.div`
  margin-left: ${SIDEBAR_WIDTH}px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
`;

const Main = styled.main`
  margin-left: 39px;
  margin-top:90px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
