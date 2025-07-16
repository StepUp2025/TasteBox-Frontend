// src/shared/ui/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}
