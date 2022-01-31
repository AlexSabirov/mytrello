import { FC, useCallback, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { boardSlice } from '../../store/ducks/board/';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { useToggle } from '../../store/hooks/useToggle';
import { Comment } from '../../types/data';
import { CommentForm, CommentUpdate } from './form-values';

interface CommentProps {
  columnId: string;
  cardId: string;
  comment: Comment;
}

const CommentItem: FC<CommentProps> = ({ columnId, cardId, comment }) => {
  const { id: commentId } = comment;
  const { visible, toggle } = useToggle();
  const { user } = useAppSelector((state) => state.boardSlice);
  const { updateComment, removeComment } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const formRef = useRef<CommentForm>();

  const updateCommentFunction = useCallback(
    (values: CommentUpdate) => {
      dispatch(updateComment({ title: values['comment'], columnId, cardId, commentId }));
    },
    [dispatch, updateComment, columnId, cardId, commentId],
  );

  const updateCommentAndClose = (values: CommentUpdate) => {
    updateCommentFunction(!values.comment ? initialValues : values);
    toggle();
  };

  const removeCommentFunction = useCallback(() => {
    dispatch(removeComment({ columnId, cardId, commentId }));
  }, [dispatch, removeComment, columnId, cardId, commentId]);

  const initialValues = { comment: comment.title };

  const onSubmit = (values: CommentUpdate) => {
    updateCommentAndClose(values);
  };

  return (
    <CommentWrapper>
      <CommentUser>{user}:</CommentUser>
      {visible ? (
        <CommentItemWrapper>
          <div onDoubleClick={toggle}>{comment.title}</div>
          <CommentItemButtons>
            <button onClick={toggle}>Edit</button>
            <button onClick={removeCommentFunction}>Del</button>
          </CommentItemButtons>
        </CommentItemWrapper>
      ) : (
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ form, handleSubmit }) => {
            formRef.current = form;
            return (
              <CommentItemWrapper onSubmit={handleSubmit}>
                <Field name="comment" render={(props) => <input {...props.input} />} />
                <CommentItemButtons>
                  <button type="submit">Принять</button>
                  <button onClick={toggle}>X</button>
                </CommentItemButtons>
              </CommentItemWrapper>
            );
          }}
        />
      )}
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  padding: 5px 3px;
  border: 1px solid blue;
  margin-bottom: 2px;
  :last-child {
    margin-bottom: 0px;
  }
`;

const CommentItemWrapper = styled.form`
  display: flex;
`;
const CommentItemButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
`;

const CommentUser = styled.div`
  font-size: 16px;
  text-align: left;
  text-decoration: underline;
`;

export default CommentItem;
