import { FC, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';
import { Card } from '../../types/data';
import CommentsWindow from '../comments-window';

interface CardProps {
  columnId: string;
  cardId: string;
  card: Card;
}

const CardItem: FC<CardProps> = ({ columnId, card }) => {
  const { id: cardId } = card;
  const [, dispatch] = useContext(BoardContext);
  const [isModalComment, setModalComment] = useState(false);
  const onOpen = () => setModalComment(true);
  const onClose = () => setModalComment(false);
  const [value, setValue] = useState(card.title);
  const [visibleCard, setVisibleCard] = useState(true);

  const updateColumn = useCallback(() => {
    dispatch({
      type: BoardActionTypes.UpdateCard,
      payload: { title: value, columnId, cardId },
    });
  }, [dispatch, value, columnId, cardId]);

  const updateColumnAndClose = () => {
    updateColumn();
    toggleCard();
  };

  const toggleCard = () => {
    visibleCard ? setVisibleCard(false) : setVisibleCard(true);
  };
  const removeCard = useCallback(() => {
    dispatch({
      type: BoardActionTypes.RemoveCard,
      payload: { columnId, cardId },
    });
  }, [dispatch, columnId, cardId]);

  return (
    <CardWrapper>
      {visibleCard ? (
        <CardItemWrapper>
          <CardItemTitle onClick={onOpen}>{card.title}</CardItemTitle>
          <CardItemButtons>
            <button onClick={toggleCard}>Edit</button>
            <button onClick={removeCard}>Del</button>
          </CardItemButtons>
        </CardItemWrapper>
      ) : (
        <CardItemWrapper>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <CardItemButtons>
            <button onClick={updateColumnAndClose}>Принять</button>
            <button onClick={toggleCard}>X</button>
          </CardItemButtons>
        </CardItemWrapper>
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
