import { X } from 'lucide-react';
import { ReactNode } from 'react';
import { ButtonScheme } from 'shared/types/theme';
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
  confirmScheme?: ButtonScheme;
  onConfirm?: () => void;
  confirmType?: 'submit' | 'button';
}

export const Modal = ({
  open,
  onClose,
  title,
  children,
  confirmText,
  confirmScheme,
  onConfirm,
  confirmType,
}: ModalProps) => {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} type="button">
          <X />
        </CloseButton>
        <ModalTitle>{title}</ModalTitle>

        {children}

        <Footer>
          <Button
            buttonSize="large"
            fontSize="small"
            scheme={confirmScheme ?? 'primary'}
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
