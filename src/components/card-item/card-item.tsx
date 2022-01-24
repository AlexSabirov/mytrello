import { ChangeEvent, FC, KeyboardEventHandler, useCallback, useState } from 'react';
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
  const [value, setValue] = useState(card.title);
  const [visibleCard, setVisibleCard] = useState(true);

  const { updateCard, removeCard } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const updateCardFunction = useCallback(() => {
    dispatch(updateCard({ title: value, columnId, cardId }));
  }, [dispatch, updateCard, value, columnId, cardId]);

  const updateCardAndClose = () => {
    updateCardFunction();
    toggleCard();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      updateCardAndClose();
    }
  };

  const toggleCard = () => {
    visibleCard ? setVisibleCard(false) : setVisibleCard(true);
  };
  const removeCardFunction = useCallback(() => {
    dispatch(removeCard({ columnId, cardId }));
  }, [dispatch, removeCard, columnId, cardId]);

  const UpdateColumnForm = () => (
    <Form
      onSubmit={() => {}}
      render={() => (
        <CardItemWrapper>
          <Field
            name="UpdateColumn"
            initialValue={value}
            value={value}
            component="input"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <CardItemButtons>
            <button onClick={updateCardAndClose}>Принять</button>
            <button onClick={toggleCard}>X</button>
          </CardItemButtons>
        </CardItemWrapper>
      )}
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
        <div>{UpdateColumnForm()}</div>
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

const CardItemWrapper = styled.div`
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
