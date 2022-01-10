import React, { useContext } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';
import CommentsWindow from '../comments-window';

const TodoItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const TodoItem: React.FC = () => {
  const [state, dispatch] = useContext(BoardContext);

  const [isModalComment, setModalComment] = React.useState(false);
  const onOpen = () => setModalComment(true);
  const onClose = () => setModalComment(false);

  return (
    <TodoItemWrapper>
      <div onClick={onOpen}>{state.cards.card.todos?.todo.title || ''}</div>
      <button
        onClick={() => dispatch({ type: BoardActionTypes.RemoveTodo, payload: state })}
      >
        X
      </button>
      <CommentsWindow
        visible={isModalComment}
        title="Комментарии:"
        onClose={onClose}
        removeComment={function (): void {
          throw new Error('Function not implemented.');
        }}
        id={v4()}
        user={state.user}
      />
    </TodoItemWrapper>
  );
};

export { TodoItem };
