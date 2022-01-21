import { FC, KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch } from '../../redux/hooks/redux';
import { boardSlice } from '../../redux/store/reducers/board-reducer';
import { Columns } from '../../types/data';
import CardList from '../card-list';

interface ColumnProps {
  column: Columns;
}

const ColumnItem: FC<ColumnProps> = ({ column }) => {
  const { id: columnId } = column;
  const { updateColumn, removeColumn, addCard } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');
  const [valueUpdate, setValueUpdate] = useState(column.title);
  const [visibleTitle, setVisibleTitle] = useState(true);

  const addCardFunction = useCallback(() => {
    dispatch(addCard({ title: value, columnId }));
  }, [dispatch, addCard, value, columnId]);

  const clearInput = () => {
    setValue('');
  };

  const addCardAndClearInput = () => {
    if (value === '') {
      return;
    }
    addCardFunction();
    clearInput();
  };

  const updateColumnFunction = useCallback(() => {
    dispatch(updateColumn({ title: valueUpdate, columnId }));
  }, [dispatch, updateColumn, valueUpdate, columnId]);

  const updateColumnAndClose = () => {
    if (valueUpdate === '') return;
    updateColumnFunction();
    toggleTitle();
  };

  const handleKeyDownAddCard: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      addCardAndClearInput();
    }
  };

  const handleKeyDownUpdateColumn: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      updateColumnAndClose();
    }
  };

  const toggleTitle = () => {
    visibleTitle ? setVisibleTitle(false) : setVisibleTitle(true);
  };

  const closeTitle = () => setVisibleTitle(true);

  const removeColumnFunction = useCallback(() => {
    dispatch(removeColumn({ columnId }));
  }, [dispatch, removeColumn, columnId]);

  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        closeTitle();
        break;
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  return (
    <ColumnWrapper>
      <ColumnButtonsWrapper>
        {visibleTitle ? (
          <ColumnTitleWrapper>
            <ColumnTitle onDoubleClick={toggleTitle}>{column.title}</ColumnTitle>
            <ButtonTitle onClick={toggleTitle}>Edit</ButtonTitle>
          </ColumnTitleWrapper>
        ) : (
          <UpdateColumnWrapper>
            <input
              value={valueUpdate}
              onChange={(e) => {
                setValueUpdate(e.target.value);
              }}
              onKeyDown={handleKeyDownUpdateColumn}
            />
            <button onClick={updateColumnAndClose}></button>
            <ButtonUpdateTitle onClick={updateColumnAndClose}>ОК</ButtonUpdateTitle>
            <ButtonTitle onClick={toggleTitle}>х</ButtonTitle>
          </UpdateColumnWrapper>
        )}
        <ColumnInputWrapper>
          <ColumnInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDownAddCard}
          />
          <ColumnButton onClick={addCardAndClearInput}>+</ColumnButton>
        </ColumnInputWrapper>
      </ColumnButtonsWrapper>
      <CardList columnId={columnId} />
      <RemoveColumnButton onClick={removeColumnFunction}>X</RemoveColumnButton>
    </ColumnWrapper>
  );
};

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 15px;
  background-color: rgb(202, 202, 202);
  border-radius: 5px;
  min-width: 340px;
  position: relative;
`;

const ColumnTitleWrapper = styled.div`
  min-height: 55px;
  display: flex;
  align-items: center;
  padding: 10px 5px;
`;

const ColumnTitle = styled.h3`
  font-size: 26px;
`;

const ButtonTitle = styled.button`
  padding: 0 5px;
`;

const UpdateColumnWrapper = styled.div`
  min-height: 55px;
  display: flex;
  padding: 10px 5px;
`;

const ButtonUpdateTitle = styled.button`
  margin-left: auto;
`;

const ColumnButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const ColumnInputWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 3px;
`;

const ColumnInput = styled.input`
  min-width: 80%;
  height: 40px;
  padding: 5px;
`;

const ColumnButton = styled.button`
  min-width: 20%;
  font-size: 26px;
  display: inline-block;
  border-radius: 3px;
  background: rgb(79, 79, 211);
  color: #ffffff;
  border: 1px solid white;
  &:hover {
    opacity: 0.9;
  }
`;

const RemoveColumnButton = styled.button`
  position: absolute;
  top: 5px;
  right: 20px;
  font-size: 20px;
  color: red;
  border: none;
  background: none;
  cursor: pointer;
`;

export { ColumnItem };
