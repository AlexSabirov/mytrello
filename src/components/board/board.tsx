import { ChangeEvent, FC, KeyboardEventHandler, useCallback, useState } from 'react';
import { Field, Form } from 'react-final-form';
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

  const NewColumnForm = () => (
    <Form
      onSubmit={() => {}}
      render={() => (
        <div>
          <Field
            name="NewColumn"
            placeholder="Введите имя колонки"
            initialValue={value}
            value={value}
            component="input"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={addColumnAndClearInput}>Add Column</button>
        </div>
      )}
    />
  );

  return (
    <BoardWrapper>
      <ColumnList />
      {NewColumnForm()}
    </BoardWrapper>
  );
};

const BoardWrapper = styled.div`
  padding: 5px;
`;

export default BoardItem;
