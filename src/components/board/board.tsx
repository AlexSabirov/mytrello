import { useCallback, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { boardSlice } from '../../store/ducks/board/';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import ColumnList from '../column-list';
import ModalWindow from '../modal';
import UiModal from '../ui-modal';
import { BoardForm, ColumnName, initialValues } from './form-values';

const BoardItem = function (): JSX.Element {
  const { user } = useAppSelector((state) => state.boardSlice);
  const formRef = useRef<BoardForm>();
  const { addColumn } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const [visibleModal, setVisibleModal] = useState(() => user === '');

  const updateVisibleModal = useCallback((value: boolean) => {
    setVisibleModal(value);
  }, []);

  const addColumnFunction = useCallback(
    (values) => {
      dispatch(addColumn({ title: values['column'] }));
    },
    [dispatch, addColumn],
  );

  const addColumnAndClear = (values: ColumnName, form: BoardForm) => {
    addColumnFunction(!values.column ? initialValues : values);
    form.change('column', '');
  };

  const onSubmit = (values: ColumnName, form: BoardForm) => {
    addColumnAndClear(values, form);
  };

  return (
    <>
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
                    <input {...props.input} placeholder="Введите имя колонки" />
                  )}
                />
                <button type="submit">Add Column</button>
              </form>
            );
          }}
        />
      </BoardWrapper>
      <UiModal visibleModal={visibleModal}>
        <ModalWindow updateVisibleModal={updateVisibleModal} />
      </UiModal>
    </>
  );
};

const BoardWrapper = styled.div`
  position: relative;
  padding: 5px;
`;

export default BoardItem;
