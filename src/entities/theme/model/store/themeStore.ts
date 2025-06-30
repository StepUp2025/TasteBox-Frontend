import { ThemeName } from "shared/types/theme";
import { create } from "zustand";

interface ThemeState {
  theme: ThemeName;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
}

const THEME_KEY = "theme";

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem(THEME_KEY) as ThemeName) || "light",
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem(THEME_KEY, newTheme);
      return { theme: newTheme };
    }),
  setTheme: (theme: ThemeName) => {
    localStorage.setItem(THEME_KEY, theme);
    set({ theme });
  },
}));
