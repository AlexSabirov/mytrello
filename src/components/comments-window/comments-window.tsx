import React, { useContext } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';
import { Comment } from '../../types/data';
import { Modal } from '../../types/data';
import CommentsList from '../comments-list';

const ModalWindowWrapper = styled.div`
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

const ModalWindowContent = styled.div`
  padding: 20px;
  border: 1px solid #000000;
  border-radius: 3px;
  background-color: gray;
`;

interface CommentsWindowProps extends Comment, Modal {}

const CommentsWindow: React.FC<CommentsWindowProps> = (props) => {
  const { visible = false, title = '', onClose } = props;
  const [state, dispatch] = useContext(BoardContext);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      dispatch({ type: BoardActionTypes.AddComment, payload: state });
    }
  };

  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  if (!visible) return null;

  return (
    <ModalWindowWrapper onClick={onClose}>
      <ModalWindowContent onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <input
          value={state.cards.card.todos?.todo.comments?.comment.comment || ''}
          onChange={() => dispatch({ type: BoardActionTypes.AddComment, payload: state })}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => dispatch({ type: BoardActionTypes.AddComment, payload: state })}
        >
          Добавить
        </button>
        <div onClick={onClose}>X</div>
        <CommentsList />
      </ModalWindowContent>
    </ModalWindowWrapper>
  );
};

export default CommentsWindow;
