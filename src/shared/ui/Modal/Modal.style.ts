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
  position: relative;
  padding: 1.5rem;
  background: ${({ theme }) => theme.color.basicBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: 480px; // TODO: 반응형 적용시 버튼 길이와 width 변경
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
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 32px;
`;
