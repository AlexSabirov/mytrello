import { FC } from 'react';
import styled from 'styled-components';

interface UiModalProps {
  visibleModal: boolean;
}

export const UiModal: FC<UiModalProps> = ({ children, visibleModal }) => {
  return !visibleModal ? null : <ModalWrapper>{children}</ModalWrapper>;
};

const ModalWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 20;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
