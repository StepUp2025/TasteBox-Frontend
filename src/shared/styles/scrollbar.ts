import { css, DefaultTheme } from 'styled-components';

export const customScrollbar = (_theme: DefaultTheme) => css`
  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.border};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
    background-color: ${({ theme }) => theme.color.secondText};
  }
`;
