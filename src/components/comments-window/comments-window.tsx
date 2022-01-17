import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';
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

interface CommentsWindowProps extends Modal {
  columnId: string;
  cardId: string;
}

const CommentsWindow: React.FC<CommentsWindowProps> = ({
  columnId,
  cardId,
  visible = false,
  onClose,
}) => {
  const [value, setValue] = useState('');
  const [, dispatch] = useContext(BoardContext);

  const addComment = useCallback(() => {
    dispatch({
      type: BoardActionTypes.AddComment,
      payload: { comment: value, columnId, cardId },
    });
  }, [dispatch, value, columnId, cardId]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      addComment();
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

  if (!visible) return null;

  return (
    <ModalWindowWrapper onClick={onClose}>
      <ModalWindowContent onClick={(e) => e.stopPropagation()}>
        <input
          value={value}
          onChange={(e) => setValue(() => e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addComment}>Добавить комментарий</button>
        <div onClick={onClose}>X</div>
        <CommentsList columnId={columnId} cardId={cardId} />
      </ModalWindowContent>
    </ModalWindowWrapper>
  );
};

export default CommentsWindow;
