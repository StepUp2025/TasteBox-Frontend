// src/app/Layout.tsx
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      {/* 예: 헤더나 사이드바가 있다면 여기에 */}
      <header>사이드바 영역</header>

      <main>
        <Outlet /> {/* 이게 자식 라우트들 렌더링 위치 */}
      </main>
    </>
  );
}
