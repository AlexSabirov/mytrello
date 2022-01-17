import { useContext } from 'react';

import { BoardContext } from '../../context/board/board-context';
import CommentItem from '../comment-item';

interface CommentsListProps {
  columnId: string;
  cardId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ columnId, cardId }) => {
  const [state] = useContext(BoardContext);
  return (
    <div>
      {Object.values(state.columns[columnId].cards[cardId].comments).map((comment) => (
        <CommentItem
          key={comment.id}
          columnId={columnId}
          cardId={cardId}
          commentId={comment.id}
        >
          <div>{comment.comment}</div>
        </CommentItem>
      ))}
    </div>
  );
};

export default CommentsList;
