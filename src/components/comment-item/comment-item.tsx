import { useContext } from 'react';

import { BoardContext } from '../../context/board/board-context';
// import { BoardActionTypes } from '../../store/actions-type';

interface CommentProps {
  columnId: string;
  cardId: string;
  commentId: string;
}

const CommentItem: React.FC<CommentProps> = ({ children }) => {
  const [state] = useContext(BoardContext);

  return (
    <div>
      <div>{state.user}</div>
      <div>{children}</div>
      {/* <button
        onClick={() => dispatch({ type: BoardActionTypes.RemoveComment, payload: state })}
      >
        X
      </button> */}
    </div>
  );
};

export default CommentItem;
