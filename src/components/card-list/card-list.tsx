import styled from 'styled-components';

import { Card } from '../../types/data';
import CardItem from '../card-item/';

const CardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface CardListProps {
  items: Card[];
}

const CardList: React.FC<CardListProps> = (props) => {
  const { items } = props;

  return (
    <CardListWrapper>
      {items.map((card) => (
        <CardItem key={card.id} {...card} />
      ))}
    </CardListWrapper>
  );
};

export default CardList;
