import { useCallback, useEffect, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { boardSlice } from '../../store/ducks/board/';
import { useAppDispatch } from '../../store/hooks/redux';
import { Modal } from '../../types/data';
import CommentsList from '../comments-list';
import { CommentForm, CommentName } from './form-values';

interface CommentsWindowProps extends Modal {
  columnId: string;
  cardId: string;
}

const CommentsWindow = function ({
  columnId,
  cardId,
  updateVisibleModal,
}: CommentsWindowProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { addComment } = boardSlice.actions;
  const formRef = useRef<CommentForm>();

  const addCommentFunction = useCallback(
    (values) => {
      dispatch(addComment({ title: values['comment'], columnId, cardId }));
    },
    [dispatch, addComment, columnId, cardId],
  );
  const addCommentAndClear = (values: CommentName, form: CommentForm) => {
    addCommentFunction(!values.comment ? initialValues : values);
    form.change('comment', '');
  };
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        updateVisibleModal();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  const initialValues = { comment: 'New Comment' };

  const onSubmit = (values: CommentName, form: CommentForm) => {
    addCommentAndClear(values, form);
  };

  return (
    <ModalWindowWrapper onClick={updateVisibleModal}>
      <ModalWindowContent onClick={(e) => e.stopPropagation()}>
        <Form
          onSubmit={onSubmit}
          render={({ form, handleSubmit }) => {
            formRef.current = form;
            return (
              <CommentInputWrapper onSubmit={handleSubmit}>
                <p>Ваш комментарий:</p>
                <Field
                  name="comment"
                  render={(props) => <CommentInput {...props.input} />}
                />
                <CommentButton type="submit">+</CommentButton>
              </CommentInputWrapper>
            );
          }}
        />
        <CommentWindowCloseButton onClick={updateVisibleModal}>
          X
        </CommentWindowCloseButton>
        <CommentsList columnId={columnId} cardId={cardId} />
      </ModalWindowContent>
    </ModalWindowWrapper>
  );
};

const ModalWindowWrapper = styled.div`
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
