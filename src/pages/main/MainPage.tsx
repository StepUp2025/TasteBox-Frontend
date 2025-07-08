import { useThemeStore } from 'entities/theme/model/store/themeStore';
import { ErrorBox } from 'shared/ui';
import { ProgressBar } from 'shared/ui/ProgressBar/ProgressBar';

export default function MainPage() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <div>
      <ProgressBar from={50} to={100} label={'TV 시리즈 취향 분석 중... 📺'} />
      <ErrorBox />
      <button type="button" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
      </button>
    </div>
  );
}
