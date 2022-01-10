import { useContext } from 'react';

import { BoardContext } from '../../context/board/board-context';
import { BoardActionTypes } from '../../store/actions-type';

const CommentItem: React.FC = () => {
  const [state, dispatch] = useContext(BoardContext);

  return (
    <div>
      <div>{state.user}</div>
      <div>{state.cards.card.todos?.todo.comments?.comment}</div>
      <button
        onClick={() => dispatch({ type: BoardActionTypes.RemoveComment, payload: state })}
      >
        X
      </button>
    </div>
  );
};

export default CommentItem;
