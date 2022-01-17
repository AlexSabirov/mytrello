import { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';
import { Board } from '../../types/data';
import ColumnList from '../column-list';

const BoardWrapper = styled.div`
  padding: 5px;
`;

const BoardItem: React.FC<Board> = () => {
  const [, dispatch] = useContext(BoardContext);
  const [value, setValue] = useState('');

  const addColumn = useCallback(() => {
    dispatch({ type: BoardActionTypes.AddColumn, payload: { title: value } });
  }, [value, dispatch]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      addColumn();
    }
  };

  return (
    <BoardWrapper>
      <ColumnList />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addColumn}>Add Column</button>
    </BoardWrapper>
  );
};

export default BoardItem;
