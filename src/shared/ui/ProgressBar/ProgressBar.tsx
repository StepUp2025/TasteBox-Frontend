import { useEffect, useState } from 'react';
import {
  Indicator,
  LabelRow,
  StyledProgress,
  Wrapper,
} from './ProgressBar.style';

interface ProgressBarProps {
  from: number;
  to: number;
  label: string;
}

export const ProgressBar = ({ from, to, label }: ProgressBarProps) => {
  const [current, setCurrent] = useState(from);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrent(to);
    }, 300);

    return () => clearTimeout(timeout);
  }, [to]);

  return (
    <Wrapper>
      <LabelRow>
        <span>{label}</span>
      </LabelRow>
      <StyledProgress value={current} max={100}>
        <Indicator width={current} />
      </StyledProgress>
    </Wrapper>
  );
};
