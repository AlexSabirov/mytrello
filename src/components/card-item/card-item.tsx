import { FC, KeyboardEventHandler, useCallback, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import { useAppDispatch } from '../../redux/hooks/redux';
// import { useToggle } from '../../redux/hooks/useToggle';
import { boardSlice } from '../../redux/store/reducers/board-reducer';
import { Card } from '../../types/data';
import CommentsWindow from '../comments-window';
import { CardForm, CardUpdate } from './form-values';

interface CardItemProps {
  columnId: string;
  cardId: string;
  card: Card;
}

const CardItem: FC<CardItemProps> = ({ columnId, cardId, card }) => {
  const [isModalComment, setModalComment] = useState(false);
  const onOpen = () => setModalComment(true);
  const onClose = () => setModalComment(false);
  const [visibleCard, setVisibleCard] = useState(true);
  const { updateCard, removeCard } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const formRef = useRef<CardForm>();
  // const toggleCard = useToggle();

  const updateCardFunction = useCallback(
    (values: CardUpdate) => {
      dispatch(updateCard({ title: values['card'], columnId, cardId }));
    },
    [dispatch, updateCard, columnId, cardId],
  );

  const updateCardAndClose = (values: CardUpdate) => {
    updateCardFunction(!values.card ? initialValues : values);
    toggleCard();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSubmit;
    }
  };

  const toggleCard = () => {
    setVisibleCard((state) => !state);
  };

  const removeCardFunction = useCallback(() => {
    dispatch(removeCard({ columnId, cardId }));
  }, [dispatch, removeCard, columnId, cardId]);

  const initialValues = { card: card.title };

  const onSubmit = (values: CardUpdate) => {
    updateCardAndClose(values);
  };

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
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ form, handleSubmit }) => {
            formRef.current = form;
            return (
              <CardItemWrapper onSubmit={handleSubmit}>
                <Field
                  name="card"
                  render={(props) => <input {...props.input} onKeyDown={handleKeyDown} />}
                />
                <CardItemButtons>
                  <button type="submit">Принять</button>
                  <button onClick={toggleCard}>X</button>
                </CardItemButtons>
              </CardItemWrapper>
            );
          }}
        />
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
