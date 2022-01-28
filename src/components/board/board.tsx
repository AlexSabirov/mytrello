import { FC, useCallback, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { useAppDispatch } from '../../redux/hooks/redux';
import { boardSlice } from '../../redux/store/reducers/board-reducer';
import ColumnList from '../column-list';
import { BoardForm, ColumnName, initialValues } from './form-values';

const BoardItem: FC = () => {
  const formRef = useRef<BoardForm>();
  const { addColumn } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const addColumnFunction = useCallback(
    (values) => {
      dispatch(addColumn({ title: values['column'] }));
    },
    [dispatch, addColumn],
  );

  // const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
  //   if (e.key === 'Enter') {
  //     if (formRef.current) {
  //       const { values } = formRef.current.getState();
  //       addColumnFunction(values);
  //       formRef.current.change('column', '');
  //     }
  //   }
  // };

  const onSubmit = (values: ColumnName, form: BoardForm) => {
    !values.column ? addColumnFunction(initialValues) : addColumnFunction(values);
    form.change('column', '');
  };

  return (
    <BoardWrapper>
      <ColumnList />
      <Form
        onSubmit={onSubmit}
        render={({ form, handleSubmit }) => {
          formRef.current = form;
          return (
            <form onSubmit={handleSubmit}>
              <Field
                name="column"
                initialValues={initialValues}
                render={(props) => (
                  <input
                    {...props.input}
                    placeholder="Введите имя колонки"
                    // onKeyDown={handleKeyDown}
                  />
                )}
              />
              <button type="submit">Add Column</button>
            </form>
          );
        }}
      />
    </BoardWrapper>
  );
};

const BoardWrapper = styled.div`
  padding: 5px;
`;

export default BoardItem;
