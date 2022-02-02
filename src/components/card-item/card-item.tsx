import { useCallback, useMemo, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { boardSlice } from '../../store/ducks/board/';
import { useAppDispatch } from '../../store/hooks/redux';
import { useToggle } from '../../store/hooks/useToggle';
import { Card } from '../../types/data';
import CommentsWindow from '../comments-window';
import UiModal from '../ui-modal';
import { CardForm, CardUpdate } from './form-values';

interface CardItemProps {
  columnId: string;
  cardId: string;
  card: Card;
}

const CardItem = function ({ columnId, cardId, card }: CardItemProps): JSX.Element {
  const { updateCard, removeCard } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const formRef = useRef<CardForm>();
  const { visible, toggle, close } = useToggle(true);
  const visibleModal = useToggle(false);

  const updateVisibleModal = useCallback(() => {
    visibleModal.toggle();
  }, [visibleModal]);

  const updateCardFunction = useCallback(
    (values: CardUpdate) => {
      dispatch(updateCard({ title: values['card'], columnId, cardId }));
    },
    [dispatch, updateCard, columnId, cardId],
  );

  const updateCardAndClose = (values: CardUpdate) => {
    updateCardFunction(!values.card ? initialValues : values);
    close();
  };

  const removeCardFunction = useCallback(() => {
    dispatch(removeCard({ columnId, cardId }));
  }, [dispatch, removeCard, columnId, cardId]);

  const initialValues = useMemo(() => ({ card: card.title }), [card.title]);

  const onSubmit = (values: CardUpdate) => {
    updateCardAndClose(values);
  };

  return (
    <CardWrapper>
      {visible ? (
        <CardItemWrapper>
          <CardItemTitle onClick={updateVisibleModal}>{card.title}</CardItemTitle>
          <CardItemButtons>
            <button onClick={toggle}>Edit</button>
            <button onClick={removeCardFunction}>Del</button>
          </CardItemButtons>
        </CardItemWrapper>
      ) : (
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ form, handleSubmit }) => {
            formRef.current = form;
            return (
              <CardItemWrapper onSubmit={handleSubmit}>
                <Field name="card" render={(props) => <input {...props.input} />} />
                <CardItemButtons>
                  <button type="submit">Принять</button>
                  <button onClick={toggle}>X</button>
                </CardItemButtons>
              </CardItemWrapper>
            );
          }}
        />
      )}
      <UiModal visibleModal={visibleModal.visible}>
        <CommentsWindow
          updateVisibleModal={updateVisibleModal}
          columnId={columnId}
          cardId={cardId}
        />
      </UiModal>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  z-index: 1;
  margin-bottom: 5px;
`;

const CardItemWrapper = styled.form`
  display: flex;
`;

const CardItemTitle = styled.p`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardItemButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
`;

export { CardItem };
