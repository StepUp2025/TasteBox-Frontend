import { Link } from 'react-router-dom';
import { customScrollbar } from 'shared/styles/scrollbar';
import styled, { css } from 'styled-components';
import { CONTENT_ITEM_GAP } from '../constants';

export const Wrapper = styled.section<{ $top?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: ${({ $top }) => ($top ? '0px' : '4rem')};
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.large};
    margin: 0;
  }

  width: 100%;
`;

export const MoreLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.color.thirdText};
`;

export const ToggleButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.color.thirdText};
  background: none;
  border: none;
  cursor: pointer;
`;

export const StyledIcon = styled.svg`
  stroke: ${({ theme }) => theme.color.thirdText};
  vertical-align: middle;
`;

export const ContentListContainer = styled.div<{ $scroll: boolean }>`
  display: grid;
  margin: 0 auto;
  gap: ${CONTENT_ITEM_GAP}px;
  ${({ $scroll }) =>
    $scroll
      ? css`
          grid-auto-flow: column;
          grid-auto-columns: clamp(140px, 25vw, 200px);
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 16px;
        `
      : css`
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        `};
  width: 100%;
  ${({ theme }) => customScrollbar(theme)};
`;
