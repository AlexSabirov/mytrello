import { FC, KeyboardEventHandler, useCallback, useState } from 'react';
import { Form } from 'react-final-form';
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
  const [value, setValue] = useState(comment.title);
  const [visible, setVisible] = useState(true);
  const { user } = useAppSelector((state) => state.boardSlice);
  const { updateComment, removeComment } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const updateCommentFunction = useCallback(() => {
    dispatch(updateComment({ title: value, columnId, cardId, commentId }));
  }, [dispatch, updateComment, value, columnId, cardId, commentId]);

  const updateCommentAndClose = () => {
    updateCommentFunction();
    toggleComment();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      updateCommentAndClose();
    }
  };

  const toggleComment = () => (visible ? setVisible(false) : setVisible(true));

  const removeCommentFunction = useCallback(() => {
    dispatch(removeComment({ columnId, cardId, commentId }));
  }, [dispatch, removeComment, columnId, cardId, commentId]);

  const UpdateCommentForm = () => (
    <Form
      onSubmit={() => {}}
      render={() => (
        <CommentItemWrapper>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <CommentItemButtons>
            <button onClick={updateCommentAndClose}>Принять</button>
            <button onClick={toggleComment}>X</button>
          </CommentItemButtons>
        </CommentItemWrapper>
      )}
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
        <div>{UpdateCommentForm()}</div>
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

const CommentItemWrapper = styled.div`
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
