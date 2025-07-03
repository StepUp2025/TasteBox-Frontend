import { X } from 'lucide-react';
import { ReactNode } from 'react';
import Button from '../Button/Button';
import {
  CloseButton,
  Footer,
  ModalContainer,
  ModalTitle,
  Overlay,
} from './Modal.style';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  confirmText: string;
  onConfirm?: () => void;
  confirmType?: 'submit' | 'button';
}

export const Modal = ({
  open,
  onClose,
  title,
  children,
  confirmText,
  onConfirm,
  confirmType,
}: ModalProps) => {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X />
        </CloseButton>
        <ModalTitle>{title}</ModalTitle>

        {children}

        <Footer>
          <Button
            buttonSize="medium"
            fontSize="small"
            scheme="secondary"
            borderRadius="round"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            buttonSize="medium"
            fontSize="small"
            scheme="primary"
            borderRadius="round"
            onClick={onConfirm}
            type={confirmType === 'submit' ? 'submit' : 'button'}
          >
            {confirmText}
          </Button>
        </Footer>
      </ModalContainer>
    </Overlay>
  );
};
