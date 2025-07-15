import { rgba } from 'polished';
import styled from 'styled-components';

export const BackgroundImage = styled.div<{ $imageUrl?: string }>`
  position: absolute; 
  top: 0;
  left: 0;
  height: 240px; 
  width: 100vw;
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;

    &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    background: linear-gradient(
      to bottom,
    ${({ theme }) => rgba(theme.color.basicBackground, 0)} 0%,
    ${({ theme }) => rgba(theme.color.basicBackground, 1)} 90%
    );
  }
`;

export const BackgroundWrapper = styled.div`
  position: relative;
  z-index: 1;
`;
