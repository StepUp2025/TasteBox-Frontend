import { Link } from 'react-router-dom';
import { customScrollbar } from 'shared/styles/scrollbar';
import styled from 'styled-components';
import {
  CONTENT_ITEM_GAP,
  CONTENT_LIST_MAX_WIDTH,
  CONTENT_LIST_MIN_WIDTH,
} from '../constants';

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 4rem;
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
  max-width: ${CONTENT_LIST_MAX_WIDTH}px;
  min-width: ${CONTENT_LIST_MIN_WIDTH}px;
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
  display: flex;
  margin: 0 auto;
  gap: ${CONTENT_ITEM_GAP}px;
  flex-wrap: ${({ $scroll }) => ($scroll ? 'nowrap' : 'wrap')};
  overflow-x: ${({ $scroll }) => ($scroll ? 'auto' : 'visible')};
  padding-bottom: ${({ $scroll }) => ($scroll ? '16px' : '0')};
  width: 100%;
  max-width: ${CONTENT_LIST_MAX_WIDTH}px;
  min-width: ${CONTENT_LIST_MIN_WIDTH}px;
  ${({ theme }) => customScrollbar(theme)};
`;
