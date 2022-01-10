import React, { useContext } from 'react';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';
import { Board } from '../../types/data';
import CardList from '../card-list';

const Board = () => {
  const [state, dispatch] = useContext(BoardContext);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') dispatch({ type: BoardActionTypes.AddCard, payload: state });
  };

  return (
    <div>
      <CardList />
      <input
        value={state.cards.card.title}
        onChange={() => dispatch({ type: BoardActionTypes.AddCard, payload: state })}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => dispatch({ type: BoardActionTypes.AddCard, payload: state })}
      >
        Add Card
      </button>
    </div>
  );
};

export default Board;
