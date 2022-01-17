import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';
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
  border: 1px solid #000000;
  background-color: red;
  text-align: center;
`;

const ModalWindow: React.FC<Modal> = (props) => {
  const [value, setValue] = useState('');
  const { visible = true, onClose } = props;
  const [state, dispatch] = useContext(BoardContext);
  const addUserName = useCallback(() => {
    dispatch({ type: BoardActionTypes.AddUserName, payload: { user: value } });
  }, [value, dispatch]);

  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      addUserName();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  if (state.user !== '') {
    return null;
  }

  if (!visible) return null;

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>Введите ваше имя:</h3>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addUserName}>Принять</button>
        <ModalClose onClick={onClose}>X</ModalClose>
      </ModalContent>
    </ModalWrapper>
  );
};

export { ModalWindow };
