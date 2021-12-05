import styled from 'styled-components';

import { Card } from '../../types/data';
import CardItem from '../card-item/';

const CardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface CardListProps {
  items: Card[];
  removeCard: (idCard: number) => void;
}

const CardList: React.FC<CardListProps> = (props) => {
  const { items, removeCard } = props;

  return (
    <CardListWrapper>
      {items.map((card) => (
        <CardItem
          id={card.idCard}
          removeTodo={function (): void {
            throw new Error('Function not implemented.');
          }}
          title={''}
          key={card.idCard}
          removeCard={removeCard}
          {...card}
        />
      ))}
    </CardListWrapper>
  );
};

export default CardList;
