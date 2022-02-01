import { FC, KeyboardEventHandler, useCallback, useEffect, useMemo, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { boardSlice } from '../../store/ducks/board/';
import { useAppDispatch } from '../../store/hooks/redux';
import { useToggle } from '../../store/hooks/useToggle';
import { Columns } from '../../types/data';
import CardList from '../card-list';
import {
  CardForm,
  CardName,
  ColumnForm,
  ColumnNameUpdate,
  initialValuesCardAdd,
} from './form-values';

interface ColumnProps {
  column: Columns;
}

const ColumnItem: FC<ColumnProps> = ({ column }) => {
  const { id: columnId } = column;
  const { updateColumn, removeColumn, addCard } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const { visible, toggle, close } = useToggle(true);
  const formRefCard = useRef<CardForm>();
  const formRefColumn = useRef<ColumnForm>();

  const addCardFunction = useCallback(
    (values) => {
      dispatch(addCard({ title: values['card'], columnId }));
    },
    [dispatch, addCard, columnId],
  );

  const AddCardAndClear = (values: CardName, form: CardForm) => {
    addCardFunction(!values.card ? initialValuesCardAdd : values);
    form.change('card', '');
  };

  const updateColumnFunction = useCallback(
    (values) => {
      dispatch(updateColumn({ title: values['columns'], columnId }));
    },
    [dispatch, updateColumn, columnId],
  );

  const updateColumnAndClose = (values: ColumnNameUpdate) => {
    updateColumnFunction(!values.columns ? initialValuesColumnUpdate : values);
    toggle();
  };

  const handleKeyDownAddCard: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      newCardSubmit;
    }
  };

  const removeColumnFunction = useCallback(() => {
    dispatch(removeColumn({ columnId }));
  }, [dispatch, removeColumn, columnId]);

  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        close();
        break;
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  const columnUpdateSubmit = (values: ColumnNameUpdate) => {
    updateColumnAndClose(values);
  };

  const initialValuesColumnUpdate = useMemo(
    () => ({ columns: column.title }),
    [column.title],
  );

  const newCardSubmit = (values: CardName, form: CardForm) => {
    AddCardAndClear(values, form);
  };

  return (
    <ColumnWrapper>
      <ColumnButtonsWrapper>
        {visible ? (
          <ColumnTitleWrapper>
            <ColumnTitle onDoubleClick={toggle}>{column.title}</ColumnTitle>
            <ButtonTitle onClick={toggle}>Edit</ButtonTitle>
          </ColumnTitleWrapper>
        ) : (
          <Form
            onSubmit={columnUpdateSubmit}
            initialValues={initialValuesColumnUpdate}
            render={({ form, handleSubmit }) => {
              formRefColumn.current = form;
              return (
                <UpdateColumnWrapper onSubmit={handleSubmit}>
                  <Field name="columns" render={(props) => <input {...props.input} />} />
                  <ButtonUpdateTitle type="submit">ОК</ButtonUpdateTitle>
                  <ButtonTitle onClick={toggle}>х</ButtonTitle>
                </UpdateColumnWrapper>
              );
            }}
          />
        )}
        <Form
          onSubmit={newCardSubmit}
          render={({ form, handleSubmit }) => {
            formRefCard.current = form;
            return (
              <ColumnInputWrapper onSubmit={handleSubmit}>
                <Field
                  name="card"
                  render={(props) => (
                    <ColumnInput
                      {...props.input}
                      placeholder="Введите имя карточки"
                      onKeyDown={handleKeyDownAddCard}
                    />
                  )}
                />
                <ColumnButton type="submit">+</ColumnButton>
              </ColumnInputWrapper>
            );
          }}
        />
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

const UpdateColumnWrapper = styled.form`
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

const ColumnInputWrapper = styled.form`
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
