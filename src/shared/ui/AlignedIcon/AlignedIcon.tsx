import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const AlignedIcon = ({ children }: Props) => {
  return <StyledIcon>{children}</StyledIcon>;
};

const StyledIcon = styled.span`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    stroke: ${({ theme }) => theme.color.constantWhite};
    vertical-align: middle;
    flex-shrink: 0;
  }
`;

export default AlignedIcon;
