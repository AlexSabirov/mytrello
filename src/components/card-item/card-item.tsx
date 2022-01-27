import { FormApi } from 'final-form';
import { FC, KeyboardEventHandler, useCallback, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { useAppDispatch } from '../../redux/hooks/redux';
import { boardSlice } from '../../redux/store/reducers/board-reducer';
import { Card } from '../../types/data';
import CommentsWindow from '../comments-window';

interface CardProps {
  columnId: string;
  cardId: string;
  card: Card;
}

const CardItem: FC<CardProps> = ({ columnId, card }) => {
  const { id: cardId } = card;
  const [isModalComment, setModalComment] = useState(false);
  const onOpen = () => setModalComment(true);
  const onClose = () => setModalComment(false);
  const [visibleCard, setVisibleCard] = useState(true);
  const { updateCard, removeCard } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const formRef = useRef<FormApi<CardUpdate, Partial<CardUpdate>>>();

  const updateCardFunction = useCallback(
    (values: CardUpdate) => {
      dispatch(updateCard({ title: values['card'], columnId, cardId }));
    },
    [dispatch, updateCard, columnId, cardId],
  );

  const updateCardAndClose = (values: CardUpdate) => {
    updateCardFunction(values);
    toggleCard();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      if (formRef.current) {
        const { values } = formRef.current.getState();
        updateCardAndClose(values);
      }
    }
  };

  const toggleCard = () => {
    visibleCard ? setVisibleCard(false) : setVisibleCard(true);
  };
  const removeCardFunction = useCallback(() => {
    dispatch(removeCard({ columnId, cardId }));
  }, [dispatch, removeCard, columnId, cardId]);

  const initialValues = { card: card.title };

  const onSubmit = (values: CardUpdate) => {
    !values.card ? updateCardAndClose(initialValues) : updateCardAndClose(values);
  };

  const UpdateCardForm: FC<CardUpdateFieldProps> = () => (
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
              <button onClick={toggleCard}>X</button>
            </CardItemButtons>
          </CardItemWrapper>
        );
      }}
    />
  );

  return (
    <CardWrapper>
      {visibleCard ? (
        <CardItemWrapper>
          <CardItemTitle onClick={onOpen}>{card.title}</CardItemTitle>
          <CardItemButtons>
            <button onClick={toggleCard}>Edit</button>
            <button onClick={removeCardFunction}>Del</button>
          </CardItemButtons>
        </CardItemWrapper>
      ) : (
        <UpdateCardForm onKeyDown={handleKeyDown} />
      )}
      <CommentsWindow
        visible={isModalComment}
        onClose={onClose}
        columnId={columnId}
        cardId={cardId}
      />
    </CardWrapper>
  );
};

interface CardUpdate {
  card: string;
}

interface CardUpdateFieldProps {
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const CardWrapper = styled.div`
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
