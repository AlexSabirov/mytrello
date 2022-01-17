import { FC, KeyboardEventHandler, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';
import { Comment } from '../../types/data';

interface CommentProps {
  columnId: string;
  cardId: string;
  comment: Comment;
}

const CommentItem: FC<CommentProps> = ({ columnId, cardId, comment }) => {
  const { id: commentId } = comment;
  const [state, dispatch] = useContext(BoardContext);
  const [value, setValue] = useState(comment.title);
  const [visible, setVisible] = useState(true);

  const updateComment = useCallback(() => {
    dispatch({
      type: BoardActionTypes.UpdateComment,
      payload: { title: value, columnId, cardId, commentId },
    });
  }, [dispatch, value, columnId, cardId, commentId]);

  const updateCommentAndClose = () => {
    updateComment();
    toggleComment();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      updateCommentAndClose();
    }
  };

  const toggleComment = () => (visible ? setVisible(false) : setVisible(true));

  const removeComment = useCallback(() => {
    dispatch({
      type: BoardActionTypes.RemoveComment,
      payload: { columnId, cardId, commentId },
    });
  }, [dispatch, columnId, cardId, commentId]);

  return (
    <CommentWrapper>
      <CommentUser>{state.user}:</CommentUser>
      {visible ? (
        <CommentItemWrapper>
          <div onDoubleClick={toggleComment}>{comment.title}</div>
          <CommentItemButtons>
            <button onClick={toggleComment}>Edit</button>
            <button onClick={removeComment}>Del</button>
          </CommentItemButtons>
        </CommentItemWrapper>
      ) : (
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
