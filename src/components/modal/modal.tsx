import { FormApi } from 'final-form';
import {
  FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { boardSlice } from '../../redux/store/reducers/board-reducer';
import { FieldRenderProps, initialValues, UserName } from './form-values';

const ModalWindow: FC = () => {
  const { user } = useAppSelector((state) => state.boardSlice);
  const { addUserName } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const formRef = useRef<FormApi<UserName, Partial<UserName>>>();

  const [visible, setModal] = useState(() => user === '');

  const addUserNameFunction = useCallback(
    (values) => {
      dispatch(addUserName(values['user']));
    },
    [dispatch, addUserName],
  );

  const onClose = () => setModal(false);

  // const addUserNameAndCloseModal = () => {
  //   if (formRef.current) {
  //     const { values } = formRef.current.getState();
  //     addUserNameFunction(values);
  //   }
  //   onClose();
  // };

  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      if (formRef.current) {
        const { values } = formRef.current.getState();
        addUserNameFunction(values);
      }
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  const onSubmit = (values: UserName) => {
    !values.user ? addUserNameFunction(initialValues) : addUserNameFunction(values);
    onClose();
  };

  const UserNameForm: FC<FieldRenderProps> = () => (
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
  );

  return !visible ? null : (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <UserNameForm onKeyDown={handleKeyDown} />
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
