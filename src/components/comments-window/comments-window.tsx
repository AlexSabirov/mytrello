import React from 'react';
import styled from 'styled-components';

import { Modal } from '../../types/data';

const ModalWindowWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWindowContent = styled.div`
  padding: 20px;
  border: 1px solid #000000;
  border-radius: 3px;
  background-color: gray;
`;

const CommentsWindow = ({ visible = false, title = '', onClose }: Modal) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  if (!visible) return null;

  return (
    <ModalWindowWrapper onClick={onClose}>
      <ModalWindowContent onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <div onClick={onClose}>X</div>
      </ModalWindowContent>
    </ModalWindowWrapper>
  );
};

export default CommentsWindow;
