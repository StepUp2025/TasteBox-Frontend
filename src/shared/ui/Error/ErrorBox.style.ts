import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 80vh;

  @media (max-width: 768px) {
  flex-direction: column;
  justify-content: center;
  gap: 4rem;
  min-width: 240px;
  margin: 0 40px;
  text-align: center;
  }
`;

export const ErrorTitle = styled.h1`
  font-size: 6rem;
  margin-bottom: 1rem;
`;

export const StatusText = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.color.secondText};
  margin-bottom: 0.75rem;
`;

export const Message = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.thirdText};
  margin-bottom: 2rem;
  white-space: pre-line;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 360px;
`;
