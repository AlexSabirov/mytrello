import React, { useContext } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';
import TodoList from '../todo-list';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 15px;
  max-width: 33%;
  background-color: rgb(202, 202, 202);
  border-radius: 5px;
  min-width: 240px;
`;

const CardTitle = styled.div`
  padding: 10px 5px;
  font-size: 26px;
`;

const CardButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardInput = styled.input`
  height: 40px;
  padding: 5px;
`;

const CardButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: rgb(79, 79, 211);
  color: #ffffff;
  border: 1px solid white;
  &:hover {
    opacity: 0.9;
  }
`;

const CardItem: React.FC = () => {
  const [state, dispatch] = useContext(BoardContext);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') dispatch({ type: BoardActionTypes.AddTodo, payload: state });
  };

  return (
    <CardWrapper>
      <CardButtonsWrapper>
        <CardTitle>{state.cards.card.title}</CardTitle>
        <CardInput
          value={state.cards.card.todos?.todos.title || ''}
          onChange={() => dispatch({ type: BoardActionTypes.AddTodo, payload: state })}
          onKeyDown={handleKeyDown}
        />
        <CardButton
          onClick={() => dispatch({ type: BoardActionTypes.AddTodo, payload: state })}
        >
          Добавить
        </CardButton>
      </CardButtonsWrapper>
      <TodoList />
      <button
        onClick={() => dispatch({ type: BoardActionTypes.RemoveCard, payload: state })}
      >
        Удалить карточку
      </button>
    </CardWrapper>
  );
};

export { CardItem };
