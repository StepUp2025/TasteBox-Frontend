import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import  GlobalStyle  from 'shared/config/global-style';
import { useThemeStore } from 'entities/theme/model/store/themeStore';
import { getTheme } from 'shared/config/theme';

export const ThemeProviders = ({ children }: { children: ReactNode }) => {
  const themeName = useThemeStore((state) => state.theme);

  return (
    <ThemeProvider theme={getTheme(themeName)}>
      <GlobalStyle themeName={themeName} />
      {children}
    </ThemeProvider>
  );
};