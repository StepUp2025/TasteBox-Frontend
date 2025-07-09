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
  width:${({ theme }) => theme.layout.width};
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const LayoutItem = styled.main`
  margin-top: 90px;
  margin-bottom: 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;        
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  `;
