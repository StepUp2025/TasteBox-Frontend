import { Theme, ThemeName } from "../types/theme";

const constantColor = {
  constantWhite: '#FFFFFF',
};

export const light: Theme = {
  name: 'light',
  color: {
    ...constantColor,
    primary: '#7762FF',
    basicBackground: '#FFFFFF',
    loginBackground: '#F1EEFF',
    subBackground: '#F4F5F9',
    highlightText: '#4225FF',
    border: '#C7C7C7',
    secondText: '#797979',
    thirdText: '#676767',
    errorText: '#CC0000',
  },
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
  buttonScheme: {
    active: {
      color: '#FFFFFF',
      backgroundColor: '#7762FF',
    },
    normal: {
      color: '#000000',
      backgroundColor: '#FFFFFF',
    },
    menu: {
      color: '#000000',
      backgroundColor: '#E0E0E0',
    },
    genre: {
      color: '#000000',
      backgroundColor: '#DADADA',
      border: '#C7C7C7',
    },
    genreActive: {
      color: '#000000',
      backgroundColor: '#DADADA',
      border: '#7762FF',
    },
  },
  borderRadius: {
    small: '5px',
    medium: '10px',
    round: '100%',
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

export const dark: Theme = {
  ...light,
  name: 'dark',
  color: {
    ...constantColor,
    primary: '#7762FF',
    basicBackground: '#000000',
    loginBackground: '#7762FF',
    subBackground: '#252525',
    highlightText: '#FFFFFF',
    border: '#252525',
    secondText: '#C7C7C7',
    thirdText: '#797979',
    errorText: '#CC0000',
  },
  shadow: {
    default: '0px 0px 10px rgba(255, 255, 255, 0.1)',
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  switch (themeName) {
    case 'light':
      return light;
    case 'dark':
      return dark;
  }
};
