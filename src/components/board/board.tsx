import { FC, KeyboardEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch } from '../../redux/hooks/redux';
import { boardSlice } from '../../redux/store/reducers/board-reducer';
import ColumnList from '../column-list';

const BoardItem: FC = () => {
  const [value, setValue] = useState('');

  const { addColumn } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const addColumnFunction = useCallback(() => {
    dispatch(addColumn({ title: value }));
  }, [dispatch, addColumn, value]);

  const clearInput = () => {
    setValue('');
  };

  const addColumnAndClearInput = () => {
    if (value === '') {
      return;
    }
    addColumnFunction();
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
