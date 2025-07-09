import { useThemeStore } from 'entities/theme/model/store/themeStore';
import { Toaster as Sonner } from 'sonner';

export const Toaster = () => {
  const { theme } = useThemeStore();

  return <Sonner theme={theme} />;
};
