import { useContext } from 'react';

import { BoardContext } from '../../context/board/board-context';
import CardItem from '../card-item';

interface CardListProps {
  columnId: string;
}

const CardList: React.FC<CardListProps> = ({ columnId }) => {
  const [state] = useContext(BoardContext);
  return (
    <div>
      {Object.values(state.columns?.[columnId]?.cards || []).map((card) => (
        <CardItem key={card.id} columnId={columnId} cardId={card.id}>
          <div>{card.title}</div>
        </CardItem>
      ))}
    </div>
  );
};

export { CardList };
