import { Loader } from 'lucide-react';
import styled from 'styled-components';

export default function Loading() {
  return (
    <StyleLoading>
      <Loader />
    </StyleLoading>
  );
}

const StyleLoading = styled.div`
    padding: 40px 0;
    text-align: center;

    @keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
    svg {
        width: 70px;
        height: 70px;
        fill: ${({ theme }) => theme.color.thirdText};
        animation: rotate 1s linear infinite;
    }
`;
