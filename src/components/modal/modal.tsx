import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { Modal } from '../../types/data';

const ModalWrapper = styled.div`
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

const ModalContent = styled.div`
  padding: 30px;
  background-color: gray;
  border: 1px solid black;
  border-radius: 3px;
`;

const ModalClose = styled.div`
  cursor: pointer;
`;

const ModalWindow: React.FC<Modal> = (props) => {
  const { visible = true, title = '', onClose } = props;
  const [userName, setUserName] = useState('Гость');

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
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} />
        <ModalClose onClick={onClose}>X</ModalClose>
      </ModalContent>
    </ModalWrapper>
  );
};

export { ModalWindow };
