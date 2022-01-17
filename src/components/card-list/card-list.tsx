import { FC, useContext } from 'react';

import { BoardContext } from '../../context/board/board-context';
import CardItem from '../card-item';

interface CardListProps {
  columnId: string;
}

const CardList: FC<CardListProps> = ({ columnId }) => {
  const [state] = useContext(BoardContext);
  return (
    <div>
      {Object.values(state.columns?.[columnId]?.cards || []).map((card) => (
        <CardItem
          key={card.id}
          card={card}
          columnId={columnId}
          cardId={card.id}
        ></CardItem>
      ))}
    </div>
  );
};

export { CardList };
