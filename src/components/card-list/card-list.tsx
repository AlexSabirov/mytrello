import { selectorCards } from '../../store/ducks/board/selectors';
import { useAppSelector } from '../../store/hooks/redux';
import CardItem from '../card-item';

interface CardListProps {
  columnId: string;
}

const CardList = function ({ columnId }: CardListProps): JSX.Element {
  const { cards } = useAppSelector(selectorCards(columnId));

  return (
    <div>
      {Object.values(cards).map((card) => (
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
