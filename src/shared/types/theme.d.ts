export type ThemeName = 'light' | 'dark';

export type ColorKey =
  | 'primary'
  | 'basicBackground'
  | 'loginBackground'
  | 'subBackground'
  | 'highlightText'
  | 'border'
  | 'secondText'
  | 'thirdText'
  | 'errorText'
  | 'constantWhite'
  | 'hoverOverlay';

export type ShadowKey = 'default';

export type FontSizeKey = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

export type ButtonSize =
  | 'genre'
  | 'menuNarrow'
  | 'menuWide'
  | 'large'
  | 'medium'
  | 'small';

export type ButtonScheme =
  | 'primary'
  | 'secondary'
  | 'menu'
  | 'menuActive'
  | 'genre'
  | 'genreActive';

export type BorderRadiusKey = 'small' | 'medium' | 'large' | 'round';

export type Layout = 'large' | 'medium' | 'small';

export type LayoutWidth = Layout;

export type MediaQuery = 'mobile' | 'tablet' | 'desktop';

export type ButtonSchemeVariant = {
  color?: string;
  backgroundColor: string;
  border?: string;
};

export interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  shadow: Record<ShadowKey, string>;
  fontSize: Record<FontSizeKey, string>;
  buttonSize: Record<
    ButtonSize,
    { fontSize?: string; width?: string; padding: string }
  >;
  buttonScheme: Record<ButtonScheme, ButtonSchemeVariant>;
  borderRadius: Record<BorderRadiusKey, string>;
  layout: {
    width: Record<LayoutWidth, string>;
  };
  mediaQuery: Record<MediaQuery, string>;
}
