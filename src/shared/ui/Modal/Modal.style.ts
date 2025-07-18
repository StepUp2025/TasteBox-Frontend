import { rgba } from 'polished';
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  min-width: 320px;
  max-width: 90vw;
  position: relative;
  padding: 1.5rem;
  background: ${({ theme }) => theme.color.basicBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: fit-content; 
  word-break: break-word;
  box-shadow: ${({ theme }) => theme.shadow.default};
`;

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-bottom: 16px;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.round};

  &:hover {
    background-color: ${({ theme }) => rgba(theme.color.hoverOverlay, 0.1)};
  }
`;

export const Footer = styled.div`
  margin-top: 2rem;
`;
