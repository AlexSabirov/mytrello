import { FC, KeyboardEventHandler, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';
import ColumnList from '../column-list';

const BoardItem: FC = () => {
  const [, dispatch] = useContext(BoardContext);
  const [value, setValue] = useState('');

  const addColumn = useCallback(() => {
    dispatch({ type: BoardActionTypes.AddColumn, payload: { title: value } });
  }, [value, dispatch]);
  const clearInput = () => {
    setValue('');
  };

  const addColumnAndClearInput = () => {
    if (value === '') {
      return;
    }
    addColumn();
    clearInput();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      addColumnAndClearInput();
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
      <button onClick={addColumnAndClearInput}>Add Column</button>
    </BoardWrapper>
  );
};

const BoardWrapper = styled.div`
  padding: 5px;
`;

export default BoardItem;
