import { useThemeStore } from "entities/theme/model/store/themeStore";
import { ReactNode } from "react";
import GlobalStyle from "shared/config/global-style";
import { getTheme } from "shared/config/theme";
import { ThemeProvider } from "styled-components";

export const ThemeProviders = ({ children }: { children: ReactNode }) => {
  const themeName = useThemeStore((state) => state.theme);

  return (
    <ThemeProvider theme={getTheme(themeName)}>
      <GlobalStyle themeName={themeName} />
      {children}
    </ThemeProvider>
  );
};
