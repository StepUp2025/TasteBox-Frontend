// src/app/Layout.tsx
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from 'widgets/Footer';
import Sidebar from 'widgets/SideBar';

export default function Layout() {
  return (
    <>
      <Sidebar />
      <LayoutWrapper>
        <LayoutItem>
          <Outlet /> {/* 이게 자식 라우트들 렌더링 위치 */}
        </LayoutItem>
        <Footer />
      </LayoutWrapper>
    </>
  );
}

const SidebarWidth = 90;

const LayoutWrapper = styled.div`
  margin-left: ${SidebarWidth}px;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
const LayoutItem = styled.main`
  margin-left: 39px;
  flex: 1;
  display: flex;
  flex-direction: column;
  `;
