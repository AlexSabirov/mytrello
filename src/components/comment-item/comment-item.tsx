import { FormApi } from 'final-form';
import { FC, KeyboardEventHandler, useCallback, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { boardSlice } from '../../redux/store/reducers/board-reducer';
import { Comment } from '../../types/data';

interface CommentProps {
  columnId: string;
  cardId: string;
  comment: Comment;
}

const CommentItem: FC<CommentProps> = ({ columnId, cardId, comment }) => {
  const { id: commentId } = comment;
  const [visible, setVisible] = useState(true);
  const { user } = useAppSelector((state) => state.boardSlice);
  const { updateComment, removeComment } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const formRef = useRef<FormApi<CommentUpdate, Partial<CommentUpdate>>>();

  const updateCommentFunction = useCallback(
    (values: CommentUpdate) => {
      dispatch(updateComment({ title: values['comment'], columnId, cardId, commentId }));
    },
    [dispatch, updateComment, columnId, cardId, commentId],
  );

  const updateCommentAndClose = (values: CommentUpdate) => {
    updateCommentFunction(values);
    toggleComment();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      if (formRef.current) {
        const { values } = formRef.current.getState();
        updateCommentAndClose(values);
      }
    }
  };

  const toggleComment = () => (visible ? setVisible(false) : setVisible(true));

  const removeCommentFunction = useCallback(() => {
    dispatch(removeComment({ columnId, cardId, commentId }));
  }, [dispatch, removeComment, columnId, cardId, commentId]);

  const initialValues = { comment: comment.title };

  const onSubmit = (values: CommentUpdate) => {
    !values.comment
      ? updateCommentAndClose(initialValues)
      : updateCommentAndClose(values);
  };

  const UpdateCommentForm: FC<CommentUpdateFieldProps> = () => (
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
              <button onClick={toggleComment}>X</button>
            </CommentItemButtons>
          </CommentItemWrapper>
        );
      }}
    />
  );

  return (
    <CommentWrapper>
      <CommentUser>{user}:</CommentUser>
      {visible ? (
        <CommentItemWrapper>
          <div onDoubleClick={toggleComment}>{comment.title}</div>
          <CommentItemButtons>
            <button onClick={toggleComment}>Edit</button>
            <button onClick={removeCommentFunction}>Del</button>
          </CommentItemButtons>
        </CommentItemWrapper>
      ) : (
        <UpdateCommentForm onKeyDown={handleKeyDown} />
      )}
    </CommentWrapper>
  );
};

interface CommentUpdateFieldProps {
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

interface CommentUpdate {
  comment: string;
}

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
