import { hoverOverlay } from 'shared/styles/hoverOverlay';
import styled from 'styled-components';

export const FileUploadWrapper = styled.div<{ $hasImage: boolean }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 32px;
  box-shadow: ${({ $hasImage, theme }) =>
    $hasImage ? `${theme.shadow.default}` : 'none'};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;


  &:hover button {
    opacity: 1;
    pointer-events: auto;
  }

  ${hoverOverlay}
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const FileUploadButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 24px;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  cursor: pointer;
  z-index: 2;
  padding: 0.5rem;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;

  svg {
    stroke: ${({ theme }) => theme.color.constantWhite};
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  z-index: 1;
  overflow: hidden;
`;
