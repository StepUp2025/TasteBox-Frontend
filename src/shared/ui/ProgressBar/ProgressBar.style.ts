import { Progress } from '@radix-ui/react-progress';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
  span {
    color: ${({ theme }) => theme.color.thirdText};
  }
`;

export const StyledProgress = styled(Progress)`
  background:  ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  width: 100%;
  height: 8px;
  overflow: hidden;
  position: relative;
`;

export const Indicator = styled.div<{ width: number }>`
  background: ${({ theme }) => theme.color.primary};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  height: 100%;
  width: ${({ width }) => width}%;
  transition: width 0.6s ease;
`;
