import { FormApi } from 'final-form';
import { useCallback, useEffect, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { boardSlice } from '../../store/ducks/board/';
import { useAppDispatch } from '../../store/hooks/redux';
import { initialValues, UserName } from './form-values';

interface ModalWindowProps {
  visibleModal: boolean;
  updateVisibleModal: (value: boolean) => void;
}

const ModalWindow = function ({
  visibleModal,
  updateVisibleModal,
}: ModalWindowProps): JSX.Element | null {
  const { addUserName } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const formRef = useRef<FormApi<UserName, Partial<UserName>>>();

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
    updateVisibleModal(!visibleModal);
  };

  const addUserNameAndClose = (values: UserName) => {
    addUserNameFunction(!values.user ? initialValues : values);
    onClose();
  };

  const onSubmit = (values: UserName) => {
    addUserNameAndClose(values);
  };

  return !visibleModal ? null : (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
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
    </ModalWrapper>
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

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 14;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { ModalWindow };
