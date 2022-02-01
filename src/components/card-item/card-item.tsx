import { FC, useCallback, useMemo, useRef, useState } from 'react';
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

const CardItem: FC<CardItemProps> = ({ columnId, cardId, card }) => {
  const onOpen = () => updateVisibleModal(true);
  const onClose = () => updateVisibleModal(false);
  const { updateCard, removeCard } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const formRef = useRef<CardForm>();
  const { visible, toggle, close } = useToggle(true);
  const [visibleModal, setVisibleModal] = useState(false);

  const updateVisibleModal = useCallback((value: boolean) => {
    setVisibleModal(value);
  }, []);

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
          <CardItemTitle onClick={onOpen}>{card.title}</CardItemTitle>
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
      <UiModal visibleModal={visibleModal}>
        <CommentsWindow onClose={onClose} columnId={columnId} cardId={cardId} />
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
