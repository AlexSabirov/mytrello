import { FormApi } from 'final-form';
import {
  FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { useAppDispatch } from '../../redux/hooks/redux';
import { boardSlice } from '../../redux/store/reducers/board-reducer';
import { Columns } from '../../types/data';
import CardList from '../card-list';
import { CardName, initialValuesCardAdd } from './form-values';

interface ColumnProps {
  column: Columns;
}

const ColumnItem: FC<ColumnProps> = ({ column }) => {
  const { id: columnId } = column;
  const { updateColumn, removeColumn, addCard } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const [visibleTitle, setVisibleTitle] = useState(true);
  const formRefCard = useRef<FormApi<CardName, Partial<CardName>>>();
  const formRefColumn = useRef<FormApi<ColumnNameUpdate, Partial<ColumnNameUpdate>>>();

  const addCardFunction = useCallback(
    (values) => {
      dispatch(addCard({ title: values['card'], columnId }));
    },
    [dispatch, addCard, columnId],
  );

  const updateColumnFunction = useCallback(
    (values) => {
      dispatch(updateColumn({ title: values['columns'], columnId }));
    },
    [dispatch, updateColumn, columnId],
  );

  const updateColumnAndClose = (values: ColumnNameUpdate) => {
    updateColumnFunction(values);
    toggleTitle();
  };

  const handleKeyDownAddCard: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      if (formRefCard.current) {
        const { values } = formRefCard.current.getState();
        addCardFunction(values);
        formRefCard.current.change('card', '');
      }
    }
  };

  const handleKeyDownUpdateColumn: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      if (formRefColumn.current) {
        const { values } = formRefColumn.current.getState();
        addCardFunction(values);
        formRefColumn.current.change('columns', '');
      }
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

  const columnUpdateSubmit = (values: ColumnNameUpdate) => {
    !values.columns
      ? updateColumnAndClose(initialValuesColumnUpdate)
      : updateColumnAndClose(values);
  };

  const initialValuesColumnUpdate = { columns: column.title };

  const UpdateColumnForm: FC<UpdateColumnFieldProps> = () => (
    <Form
      onSubmit={columnUpdateSubmit}
      initialValues={initialValuesColumnUpdate}
      render={({ form, handleSubmit }) => {
        formRefColumn.current = form;
        return (
          <UpdateColumnWrapper onSubmit={handleSubmit}>
            <Field name="columns" render={(props) => <input {...props.input} />} />
            <ButtonUpdateTitle type="submit">ОК</ButtonUpdateTitle>
            <ButtonTitle onClick={toggleTitle}>х</ButtonTitle>
          </UpdateColumnWrapper>
        );
      }}
    />
  );

  const newCardSubmit = (values: CardName) => {
    !values.card ? addCardFunction(initialValuesCardAdd) : addCardFunction(values);
  };

  const NewCardForm: FC<CardAddFieldProps> = () => (
    <Form
      onSubmit={newCardSubmit}
      render={({ form, handleSubmit }) => {
        formRefCard.current = form;
        return (
          <ColumnInputWrapper onSubmit={handleSubmit}>
            <Field
              name="card"
              render={(props) => (
                <ColumnInput {...props.input} placeholder="Введите имя карточки" />
              )}
            />
            <ColumnButton type="submit">+</ColumnButton>
          </ColumnInputWrapper>
        );
      }}
    />
  );

  return (
    <ColumnWrapper>
      <ColumnButtonsWrapper>
        {visibleTitle ? (
          <ColumnTitleWrapper>
            <ColumnTitle onDoubleClick={toggleTitle}>{column.title}</ColumnTitle>
            <ButtonTitle onClick={toggleTitle}>Edit</ButtonTitle>
          </ColumnTitleWrapper>
        ) : (
          <UpdateColumnForm onKeyDown={handleKeyDownUpdateColumn} />
        )}
        <NewCardForm onKeyDown={handleKeyDownAddCard} />
      </ColumnButtonsWrapper>
      <CardList columnId={columnId} />
      <RemoveColumnButton onClick={removeColumnFunction}>X</RemoveColumnButton>
    </ColumnWrapper>
  );
};

interface ColumnNameUpdate {
  columns: string;
}

interface CardAddFieldProps {
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

interface UpdateColumnFieldProps {
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

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
