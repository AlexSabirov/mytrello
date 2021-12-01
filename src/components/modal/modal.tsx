import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { ModalProps } from '../../types/data';

const ModalWindow = styled.div`
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

const Modal = ({ visible = true, title = '', onClose }: ModalProps) => {
  const [name, setName] = useState('');

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') addName();
  };

  const addName = () => {
    if (name) {
    }
  };

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
    <ModalWindow onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ModalClose onClick={onClose}>X</ModalClose>
      </ModalContent>
    </ModalWindow>
  );
};

export { Modal };
