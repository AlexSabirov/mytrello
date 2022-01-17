import React from 'react';
import styled from 'styled-components';

// import { v4 } from 'uuid';
// import { BoardContext } from '../../context/board/board-context';
// import { BoardActionTypes } from '../../store/actions-type';
import CommentsWindow from '../comments-window';

const CardItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

interface CardProps {
  columnId: string;
  cardId: string;
}

const CardItem: React.FC<CardProps> = ({ children, cardId, columnId }) => {
  // const [state] = useContext(BoardContext);
  const [isModalComment, setModalComment] = React.useState(false);
  const onOpen = () => setModalComment(true);
  const onClose = () => setModalComment(false);

  return (
    <CardItemWrapper>
      <div onClick={onOpen}>{children}</div>
      {/* <div {state.columns.column.cards.card.title}</div> */}
      {/* <button
        onClick={() =>
          dispatch({
            type: BoardActionTypes.RemoveTodo,
            payload: state.cards.card.todos.todo.comments.comment,
          })
        }
      >
        X
      </button> */}
      <CommentsWindow
        visible={isModalComment}
        onClose={onClose}
        columnId={columnId}
        cardId={cardId}
      />
    </CardItemWrapper>
  );
};

export { CardItem };
