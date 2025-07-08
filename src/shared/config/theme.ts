import { rgba } from 'polished';
import { Theme, ThemeName } from '../types/theme';

const createButtonScheme = (color: Theme['color']): Theme['buttonScheme'] => ({
  primary: {
    color: color.constantWhite,
    backgroundColor: color.primary,
  },
  secondary: {
    color: color.secondText,
    backgroundColor: color.basicBackground,
    border: color.border,
  },
  menu: {
    color: color.thirdText,
    backgroundColor: color.basicBackground,
  },
  menuActive: {
    backgroundColor: color.subBackground,
  },
  genre: {
    backgroundColor: color.basicBackground,
    border: color.border,
  },
  genreActive: {
    backgroundColor: rgba(color.primary, 0.3),
    border: color.primary,
  },
});

const lightColor: Theme['color'] = {
  constantWhite: '#FFFFFF',
  primary: '#7762FF',
  basicBackground: '#FFFFFF',
  loginBackground: '#F1EEFF',
  subBackground: '#F3F4FF',
  highlightText: '#4225FF',
  border: '#C7C7C7',
  secondText: '#797979',
  thirdText: '#676767',
  errorText: '#CC0000',
  hoverOverlay: '#000000',
};

export const light: Theme = {
  name: 'light',
  color: lightColor,
  shadow: {
    default: '0px 0px 10px rgba(0,0,0,0.1)',
  },
  fontSize: {
    xlarge: '2rem',
    large: '1.5rem',
    medium: '1.25rem',
    small: '1rem',
    xsmall: '0.875rem',
  },
  buttonSize: {
    small: { padding: '1rem 2rem' },
    medium: { padding: '1rem 5rem' },
    large: { width: '100%', padding: '1rem 0' },
    menuWide: { fontSize: '0.875rem', width: '120px', padding: '0.5rem 0' },
    menuNarrow: { padding: '0.5rem 0.5rem' },
    genre: { padding: '0.75rem 2rem' },
  },
  buttonScheme: createButtonScheme(lightColor),
  borderRadius: {
    small: '5px',
    medium: '10px',
    round: '100px',
  },
  layout: {
    width: {
      large: '1020px',
      medium: '760px',
      small: '320px',
    },
  },
  mediaQuery: {
    mobile: '(max-width: 768px)',
    tablet: '(max-width: 1024px)',
    desktop: '(min-width: 1025px)',
  },
};

const darkColor: Theme['color'] = {
  ...lightColor,
  basicBackground: '#000000',
  loginBackground: '#7762FF',
  subBackground: '#252525',
  highlightText: '#FFFFFF',
  border: '#676767',
  secondText: '#C7C7C7',
  thirdText: '#797979',
  hoverOverlay: '#FFFFFF',
};

export const dark: Theme = {
  ...light,
  name: 'dark',
  color: darkColor,
  buttonScheme: createButtonScheme(darkColor),
  shadow: {
    default: '0px 0px 10px rgba(255, 255, 255, 0.2)',
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  return themeName === 'dark' ? dark : light;
};
