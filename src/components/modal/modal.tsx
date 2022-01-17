import { FC, useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';

const ModalWindow: FC = () => {
  const [state, dispatch] = useContext(BoardContext);
  const [visible, setModal] = useState(() => state.user === '');
  const [value, setValue] = useState('Гость');

  const addUserName = useCallback(() => {
    dispatch({ type: BoardActionTypes.AddUserName, payload: { user: value } });
  }, [value, dispatch]);

  const onClose = () => setModal(false);

  const addUserNameAndCloseModal = () => {
    addUserName();
    onClose();
  };

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

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  return !visible ? null : (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>Введите ваше имя:</h3>
        <InputWrapper>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <ButtonAccept onClick={addUserNameAndCloseModal}>Принять</ButtonAccept>
          <ModalClose onClick={onClose}>X</ModalClose>
        </InputWrapper>
      </ModalContent>
    </ModalWrapper>
  );
};

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
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const ButtonAccept = styled.button`
  background-color: green;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 3px;
`;

const ModalClose = styled.div`
  cursor: pointer;
  border: 1px solid #000000;
  background-color: red;
  text-align: center;
  padding: 2px 5px;
  border-radius: 3px;
`;

export { ModalWindow };
