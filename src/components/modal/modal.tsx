import { FormApi } from 'final-form';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { boardSlice } from '../../store/ducks/board/';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { initialValues, UserName } from './form-values';

interface ModalWindowProps {
  updateVisibleModal: (value: boolean) => void;
}

const ModalWindow: FC<ModalWindowProps> = ({ updateVisibleModal }) => {
  const { user } = useAppSelector((state) => state.boardSlice);
  const { addUserName } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const formRef = useRef<FormApi<UserName, Partial<UserName>>>();

  const [visible, setModal] = useState(() => user === '');

  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  const addUserNameFunction = useCallback(
    (values) => {
      dispatch(addUserName(values['user']));
    },
    [dispatch, addUserName],
  );

  const onClose = () => {
    updateVisibleModal(!visible);
    setModal(false);
  };

  const addUserNameAndClose = (values: UserName) => {
    addUserNameFunction(!values.user ? initialValues : values);
    onClose();
  };

  const onSubmit = (values: UserName) => {
    addUserNameAndClose(values);
  };

  return !visible ? null : (
    <ModalContent>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ form, handleSubmit }) => {
          formRef.current = form;
          return (
            <form onSubmit={handleSubmit}>
              <label>Введите ваше имя:</label>
              <InputWrapper>
                <Field
                  name="user"
                  placeholder="Введите имя"
                  type="text"
                  render={(props) => <input {...props.input} />}
                />
                <ButtonAccept type="submit">Принять</ButtonAccept>
                <ModalClose onClick={onClose}>X</ModalClose>
              </InputWrapper>
            </form>
          );
        }}
      />
    </ModalContent>
  );
};

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

const ModalContent = styled.div`
  padding: 30px;
  background-color: gray;
  border: 1px solid black;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
`;

export { ModalWindow };
