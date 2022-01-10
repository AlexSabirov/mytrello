import { useContext } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import CardItem from '../card-item/';

const CardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const CardList: React.FC = () => {
  const [state] = useContext(BoardContext);
  return (
    <CardListWrapper>
      {() => {
        for (const key in state.cards) {
          <CardItem>
            <h4>{state.cards[key].title}</h4>
          </CardItem>;
        }
      }}
    </CardListWrapper>
  );
};

export default CardList;
