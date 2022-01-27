import { FormApi } from 'final-form';
import { FC, KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { useAppDispatch } from '../../redux/hooks/redux';
import { boardSlice } from '../../redux/store/reducers/board-reducer';
import { Modal } from '../../types/data';
import CommentsList from '../comments-list';

interface CommentsWindowProps extends Modal {
  columnId: string;
  cardId: string;
}

const CommentsWindow: FC<CommentsWindowProps> = ({
  columnId,
  cardId,
  visible = false,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { addComment } = boardSlice.actions;
  const formRef = useRef<FormApi<CommentName, Partial<CommentName>>>();

  const addCommentFunction = useCallback(
    (values) => {
      dispatch(addComment({ title: values['comment'], columnId, cardId }));
    },
    [dispatch, addComment, columnId, cardId],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      if (formRef.current) {
        const { values } = formRef.current.getState();
        addCommentFunction(values);
        formRef.current.change('comment', '');
      }
    }
  };

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

  const initialValues = { comment: 'New Comment' };

  const onSubmit = (values: CommentName) => {
    !values.comment ? addCommentFunction(initialValues) : addCommentFunction(values);
  };

  const NewCommentForm: FC<AddCommentFieldProps> = () => (
    <Form
      onSubmit={onSubmit}
      render={({ form, handleSubmit }) => {
        formRef.current = form;
        return (
          <CommentInputWrapper onSubmit={handleSubmit}>
            <p>Ваш комментарий:</p>
            <Field name="comment" render={(props) => <CommentInput {...props.input} />} />
            <CommentButton type="submit">+</CommentButton>
          </CommentInputWrapper>
        );
      }}
    />
  );

  return !visible ? null : (
    <ModalWindowWrapper onClick={onClose}>
      <ModalWindowContent onClick={(e) => e.stopPropagation()}>
        <NewCommentForm onKeyDown={handleKeyDown} />
        <CommentWindowCloseButton onClick={onClose}>X</CommentWindowCloseButton>
        <CommentsList columnId={columnId} cardId={cardId} />
      </ModalWindowContent>
    </ModalWindowWrapper>
  );
};

interface CommentName {
  comment: string;
}

interface AddCommentFieldProps {
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const ModalWindowWrapper = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWindowContent = styled.div`
  min-width: 360px;
  position: relative;
  padding: 20px;
  border: 1px solid #000000;
  border-radius: 3px;
  background-color: gray;
`;

const CommentWindowCloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 20px;
  font-size: 20px;
  color: red;
  border: none;
  background: none;
  cursor: pointer;
`;

const CommentInputWrapper = styled.form`
  display: flex;
  padding-top: 10px;
`;

const CommentInput = styled.input`
  width: 80%;
  height: 40px;
`;

const CommentButton = styled.button`
  width: 20%;
  font-size: 20px;
  border-radius: 3px;
  background: rgb(79, 79, 211);
  color: #ffffff;
  border: 1px solid white;
  &:hover {
    opacity: 0.9;
  }
`;

export default CommentsWindow;
