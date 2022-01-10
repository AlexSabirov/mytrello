import { useContext } from 'react';

import { BoardContext } from '../../context/board/board-context';
import CommentItem from '../comment-item';

const CommentsList: React.FC = () => {
  const [state] = useContext(BoardContext);
  return (
    <div>
      {() => {
        for (const key in state.cards.card.todos) {
          <CommentItem>
            <h4>{state.cards.card.todos[key].title}</h4>
          </CommentItem>;
        }
      }}
    </div>
  );
};

export default CommentsList;
