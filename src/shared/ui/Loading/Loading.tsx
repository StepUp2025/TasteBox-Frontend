import { Loader } from 'lucide-react';
import styled from 'styled-components';

export default function Loading() {
  return (
    <StyleLoading>
      <Loader />
      Loading...
    </StyleLoading>
  );
}

const StyleLoading = styled.div`
    padding: 30vh 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: ${({ theme }) => theme.color.thirdText};


    @keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
  svg {
      width: 30px;
      height: 30px;
      stroke: ${({ theme }) => theme.color.thirdText};
      animation: rotate 1s linear infinite;
  }
`;
