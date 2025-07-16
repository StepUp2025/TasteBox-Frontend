import styled from 'styled-components';

export const DeleteButton = styled.button`
  position: fixed;
  bottom: 36px;
  right: 42%;
  background-color: ${({ theme }) => theme.color.basicBackground};
  padding: 0.875rem 1.5rem;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadow.default};
  line-height: 1.5;
  z-index: 100;

  svg {
    margin-right: 12px;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.border};
    color: ${({ theme }) => theme.color.thirdText};
    cursor: not-allowed;

    svg {
      stroke: ${({ theme }) => theme.color.thirdText};
    }
  }
`;

export const IconTitleContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
`;

export const IconWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalText = styled.div`
  text-align: center;
`;
