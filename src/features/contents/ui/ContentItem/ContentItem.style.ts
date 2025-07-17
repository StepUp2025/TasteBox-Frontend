// shared/ui/contents-item/ContentItemBaseStyle.ts

import { hoverOverlay } from 'shared/styles/hoverOverlay';
import styled, { css } from 'styled-components';

export const ContentsWrapperStyle = css`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  line-height: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  gap: 0;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

export const ImgWrapper = styled.div`
  width: 100%;
  aspect-ratio: 2 / 3;

  border-radius: ${({ theme }) => theme.borderRadius.medium};
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }

  ${hoverOverlay}
`;

export const TitleWrapper = styled.div`
  margin-top: 12px;
  text-align: left;
  width: 100%;

  .title {
    font-weight: bold;
    padding: 0 0 2px 4px;
    margin: 0;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
