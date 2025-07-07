import { ColorKey } from 'shared/types/theme';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  width: number;
  height?: number;
  color: ColorKey;
}

const IconPreset = ({ children, width, height, color }: Props) => {
  return (
    <StyledIcon $width={width} $height={height ?? width} $color={color}>
      {children}
    </StyledIcon>
  );
};

const StyledIcon = styled.span<{
  $width: number;
  $height: number;
  $color: ColorKey;
}>`
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    stroke: ${({ theme, $color }) => theme.color[$color]};
    vertical-align: middle;
    flex-shrink: 0;
  }
`;

export default IconPreset;
