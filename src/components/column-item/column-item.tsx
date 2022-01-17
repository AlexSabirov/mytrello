import { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

// import { Columns } from '../../types/data';
import { BoardContext } from '../../context/board/board-context';
// import CardItem from '../card-item';
import { BoardActionTypes } from '../../store/actions-type';
import CardList from '../card-list';

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 15px;
  max-width: 33%;
  background-color: rgb(202, 202, 202);
  border-radius: 5px;
  min-width: 240px;
`;

const ColumnTitle = styled.div`
  padding: 10px 5px;
  font-size: 26px;
`;

const ColumnButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnInput = styled.input`
  height: 40px;
  padding: 5px;
`;

const ColumnButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: rgb(79, 79, 211);
  color: #ffffff;
  border: 1px solid white;
  &:hover {
    opacity: 0.9;
  }
`;
interface ColumnProps {
  columnId: string;
}

const ColumnItem: React.FC<ColumnProps> = ({ children, columnId }) => {
  const [, dispatch] = useContext(BoardContext);
  const [value, setValue] = useState('');

  const addCard = useCallback(() => {
    dispatch({ type: BoardActionTypes.AddCard, payload: { title: value, columnId } });
  }, [dispatch, value, columnId]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      addCard();
    }
  };

  return (
    <ColumnWrapper>
      <ColumnButtonsWrapper>
        <ColumnTitle>{children}</ColumnTitle>
        <ColumnInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ColumnButton onClick={addCard}>Добавить</ColumnButton>
      </ColumnButtonsWrapper>
      <CardList columnId={columnId} />
      {/* <div>
        {Object.values(state.columns[columnId].cards).map((card) => (
          <CardItem key={card.id}>
            <div>{card.title}</div>
          </CardItem>
        ))}
      </div> */}
      {/* <button
        onClick={() =>
          dispatch({
            type: BoardActionTypes.RemoveCard,
            payload: state.columns.column.cards.card,
          })
        }
      >
        Удалить карточку
      </button> */}
    </ColumnWrapper>
  );
};

export { ColumnItem };
